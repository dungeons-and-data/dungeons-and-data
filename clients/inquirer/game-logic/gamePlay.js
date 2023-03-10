/** @format */

'use strict';
let gameOn;
const inquirer = require('inquirer');

async function gamePlay(incomingChapters = [], socket) {
  gameOn = true;
  const choices = incomingChapters.map((item) => item[0] + ':' + item[1]);

  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      choices: choices,
      message: 'Pick a chapter',
    },
  ]);

  const chosenOne = reply.chap.split(':');
  const emitData = `CHAPTER: ${chosenOne[0]} : ${chosenOne[1]}`;
  socket.emit('CHAPTER_CHOSEN', emitData);
  const remainingChaps = incomingChapters.filter(
    (item) => item[1] !== chosenOne[1],
  );
  const chosenChap = incomingChapters.filter(
    (item) => item[1] === chosenOne[1],
  );

  let remainingScenarios = chosenChap[0][2];

  while (remainingScenarios.length > 0) {
    if (!gameOn) {
      return [];
    }
    remainingScenarios = await playScenario(remainingScenarios, socket);
  }

  return remainingChaps;
}

module.exports = gamePlay;

async function playScenario(remainingScenarios, socket) {
  if (!remainingScenarios.includes('END GAME')) {
    remainingScenarios.push('END GAME');
  }
  if (remainingScenarios.length === 1) {
    remainingScenarios.pop();
  }
  let reply = '';
  if (remainingScenarios.length > 0) {
    reply = await inquirer.prompt([
      {
        type: 'list',
        name: 'problem',
        choices: remainingScenarios,
        message: 'Pick a scenario for the user',
      },
    ]);
  }

  let remaining;
  if (reply.problem !== 'END GAME') {
    remaining = remainingScenarios.filter((item) => item !== reply.problem);
  } else if (reply.problem === 'END GAME') {
    socket.emit('END', 'Game Ended!');
    return 'end';
  }
  socket.emit('PROBLEM', reply.problem);

  const waitForAction = new Promise((resolve, reject) => {
    socket.on('ACTION', (payload, roll) => {
      resolve({ payload, roll });
    });
  });

  await waitForAction;

  let waitForRes = await inquirer.prompt([
    {
      type: 'list',
      name: 'chap',
      choices: ['Favorable Action', 'Unfavorable action'],
      message: 'After all heros roll. make a decision',
    },
  ]);
  if (waitForRes.chap === 'Favorable Action') {
    socket.emit('FAVORABLE', 'hero got a favorable action');
  } else if (waitForRes.chap === 'Unfavorable action') {
    socket.emit('UNFAVORABLE', 'hero got an unfavorable action');
  }

  return remaining;
}
