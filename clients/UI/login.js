'use strict'
const inquirer = require('inquirer');
const logInMenu = async () => {
  let response = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'login',
        message: 'please choose an option',
        choices: ['LOGIN', 'SIGNUP', 'EXIT'],
      }
    ])
  return response.login;
}

const signupReq = async () => {

  let response = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'Username',
        message: 'Enter Username',
      },
    ])
  let response2 = await inquirer
    .prompt([
      {
        type: 'password',
        name: 'pass',
        message: 'Enter Password',
      },
    ])
  return {
    username: response.Username,
    password: response2.pass,
  }
}

const loginReq = async () => {
  let response = await inquirer

    .prompt([
      {
        type: 'input',
        name: 'Username',
        message: 'Enter Username',
      },
    ])
  let response2 = await inquirer
    .prompt([
      {
        type: 'password',
        name: 'pass',
        message: 'Enter Password',
      },
    ])
  return {
    username: response.Username,
    password: response2.pass,
  }

}
module.exports = {
  logInMenu,
  loginReq,
  signupReq,
}

































    // let response1 = await inquirer
  // .prompt([
  //   {
  //     type: 'input',
  //     name: 'login',
  //     message: 'Enter Username',
  //   },
  // ])
  // let helper = async() => {

  //   let response2 = await inquirer
  //   .prompt([
  //     {
  //       type: 'password',
  //       name: 'pass2',
  //       message: 'Enter Password',
  //     },
  //     {
  //       type: 'password',
  //       name: 'pass1',
  //       message: 'Enter Password',
  //     }
  //   ])
  //   if(response2.pass2 !== response2.pass1)helper();
  // }