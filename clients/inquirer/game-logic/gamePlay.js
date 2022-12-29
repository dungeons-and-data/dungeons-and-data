/** @format */

'use strict';

const inquirer = require('inquirer');

async function gamePlay(incomingChapters, socket) {
  console.log(incomingChapters);
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
  console.log(chosenChap, 'CHOSEN CHAP');
  let remainingScenarios = chosenChap[0][2];
  console.log(remainingScenarios, 'REMAINING');
  while (remainingScenarios.length > 0) {
    console.log('top of loop');

    remainingScenarios = await playScenario(remainingScenarios, socket);
  }

  return remainingChaps;
}

module.exports = gamePlay;
let bad = 0;
async function playScenario(remainingScenarios, socket) {
  console.log(remainingScenarios, 'IN HERE');
  const reply = await inquirer.prompt([
    {
      type: 'list',
      name: 'problem',
      choices: remainingScenarios,
      message: 'Pick a scenario for the user',
    },
  ]);

  const remaining = remainingScenarios.filter((item) => item !== reply.problem);

  socket.emit('PROBLEM', reply.problem);
  socket.on('ACTION', (payload, roll) => console.log(payload, roll))
  socket.on('UNFAVORABLE_HERO', () => console.log('sadas'))

  let waitForRes = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chap',
        choices: ['Favorable Action', 'Unfavorable action'],
        message: 'After all heros roll. make a decision',
      },
    ]);
  if (waitForRes.chap === 'Favorable Action') {
    socket.emit('FAVORABLE', 'hero got a favorable action')
  } else if (waitForRes.chap === 'Unfavorable action') {
    socket.emit('UNFAVORABLE', 'hero got an unfavorable action')
  }

  return remaining;
}
