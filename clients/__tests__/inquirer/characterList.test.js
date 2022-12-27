const selectCharacter = require('../../inquirer/characterList');


describe('character selection module', () => {
  const getChars = jest.fn();
  const inquirer = {
    prompt: jest.fn(),
  };

  test('returns "CREATE CHARACTER" when reply is "CREATE CHARACTER"', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'CREATE CHARACTER' }));
    const result = await selectCharacter('user', inquirer);
    expect(result).toBe('CREATE CHARACTER');
  });

  test('returns "BACK" when reply is "BACK"', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'BACK' }));
    const result = await selectCharacter('user', inquirer);
    expect(result).toBe(undefined);
  });


  test('returns character data when reply is a character name', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'Character 1' }));
    const characters = [{ name: 'Character 1' }, { name: 'Character 2' }];
    getChars.mockResolvedValue(characters);
    const result = await selectCharacter('user', inquirer);
    expect(result).toEqual(undefined);
  });

  test('returns an empty object if getChars returns an empty array', async () => {
    inquirer.prompt.mockImplementationOnce(() => Promise.resolve({ chars: 'Character 1' }));
    getChars.mockResolvedValue([]);
    const result = await selectCharacter('user', inquirer);
    expect(result).toEqual(undefined);
  });
});
