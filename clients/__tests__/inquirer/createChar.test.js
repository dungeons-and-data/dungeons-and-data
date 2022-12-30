const createCharacter = require('../../inquirer/createCharInq');
const axios = require('axios');
const inquirer = require('inquirer');


describe('Create Character Inquirer', () => {
  test('creates a new character', async () => {
    inquirer.prompt = jest.fn()
      .mockResolvedValueOnce({ chars: 'YES' })
      .mockResolvedValueOnce({ name: 'John', profession: 'Barbarian' });
    axios.get = jest.fn().mockResolvedValue({
      data: {
        results: [{ name: 'Barbarian' }, { name: 'Bard' }]
      },
    });

    const response = await createCharacter();

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'chars',
      message: 'Do you want to create a new character?',
      choices: ['YES', 'NO'],
    }]);
    expect(inquirer.prompt).toHaveBeenCalled();

    // expect(response).toEqual({ name: 'John', profession: 'Barbarian' });
  });

  test('does not create a new character', async () => {

    const inquirer = require('inquirer');
    inquirer.prompt = jest.fn().mockResolvedValue({ chars: 'NO' });


    const response = await createCharacter();

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: 'list',
      name: 'chars',
      message: 'Do you want to create a new character?',
      choices: ['YES', 'NO'],
    }]);

    expect(response).toBeUndefined();
  });

});