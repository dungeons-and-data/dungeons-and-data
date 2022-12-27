'use strict';
const { logInMenu, loginReq, signupReq } = require('../../inquirer/login');


describe('Inquirer LogInMenu', () => {



  test('logInMenu prompts for login option', async () => {

    const inquirer = require('inquirer');
    inquirer.prompt = jest.fn().mockResolvedValue({ login: 'LOGIN' });


    const response = await logInMenu();

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'login',
      message: 'please choose an option',
      choices: ['LOGIN', 'SIGNUP', 'EXIT'],
    }]);


    expect(response).toEqual('LOGIN');
  });

  test('signupReq prompts for username and password', async () => {

    const inquirer = require('inquirer');
    inquirer.prompt = jest.fn()
      .mockResolvedValueOnce({ Username: 'John' })
      .mockResolvedValueOnce({ pass: 'password' });


    const response = await signupReq();

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'input',
      name: 'Username',
      message: 'Enter Username',
    }]);
    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'password',
      name: 'pass',
      message: 'Enter Password',
    }]);


    expect(response).toEqual({ username: 'John', password: 'password' });
  });

  test('loginReq prompts for username and password', async () => {

    const inquirer = require('inquirer');
    inquirer.prompt = jest.fn()
      .mockResolvedValueOnce({ Username: 'John' })
      .mockResolvedValueOnce({ pass: 'password' });

    const response = await loginReq();


    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'input',
      name: 'Username',
      message: 'Enter Username',
    }]);
    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'password',
      name: 'pass',
      message: 'Enter Password',
    }]);


    expect(response).toEqual({ username: 'John', password: 'password' });
  });
});