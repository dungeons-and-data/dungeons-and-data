'use strict';
const inquirer = require('inquirer');
const logInMenu = async () => {
  let response = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'login',
        message: 'please choose an option',
        choices: ['LOGIN', 'SIGNUP', 'EXIT'],
      },
    ]);
  return response.login;
};

const signupReq = async () => {

  let response = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'Username',
        message: 'Enter Username',
      },
    ]);
  let response2 = await inquirer
    .prompt([
      {
        type: 'password',
        name: 'pass',
        message: 'Enter Password',
      },
    ]);
  return {
    username: response.Username,
    password: response2.pass,
  };
};

const loginReq = async () => {
  let response = await inquirer

    .prompt([
      {
        type: 'input',
        name: 'Username',
        message: 'Enter Username',
      },
    ]);
  let response2 = await inquirer
    .prompt([
      {
        type: 'password',
        name: 'pass',
        message: 'Enter Password',
      },
    ]);
  return {
    username: response.Username,
    password: response2.pass,
  };

};
module.exports = {
  logInMenu,
  loginReq,
  signupReq,
};