const selectCharacter = require('../../inquirer/characterList');


describe('character selection module', () => {
  const getChars = jest.fn();
  const inquirer = {
    prompt: jest.fn(),
  };

  test('returns "BACK" when reply is "BACK"', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'BACK' }));
    getChars.mockImplementationOnce(() => Promise.resolve([{ name: 'Character 1' }, { name: 'Character 2' }]));
    const result = await selectCharacter('user', inquirer, getChars);
    expect(result).toBe(undefined);
  });

  test('returns "CREATE CHARACTER" when reply is "CREATE CHARACTER"', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'CREATE CHARACTER' }));
    getChars.mockImplementationOnce(() => Promise.resolve([{ name: 'Character 1' }, { name: 'Character 2' }]));
    const result = await selectCharacter('user', inquirer, getChars);
    expect(result).toBe('CREATE CHARACTER');
  });

  test('returns character data when reply is a character name', async () => {
    const characters = [{ name: 'Character 1' }, { name: 'Character 2' }];
    getChars.mockResolvedValue(characters);
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'Character 1' }));
    const result = await selectCharacter('user', inquirer, getChars);
    expect(result).toEqual({ name: 'Character 1' });
  });
});


