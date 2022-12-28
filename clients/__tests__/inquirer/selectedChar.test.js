
const inquirer = require('inquirer');
const SelectedChar = require('../../inquirer/selectedCharInq');
const axios = require('axios');

describe('Module test', () => {
  test('user input', async () => {
    expect.assertions(1);
    inquirer.prompt = jest.fn().mockResolvedValue('Name:', character.name);

    await expect(SelectedChar()).resolves.toEqual();
  });
});