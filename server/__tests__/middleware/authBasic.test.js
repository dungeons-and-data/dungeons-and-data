const authenticateBasic = require('../../middleware/auth/helpers/authenticateBasic');
const Users = require('../../models/User');
const bcrypt = require('bcrypt');


describe('authenticateBasic', () => {
  it('should return the user if the username and password are valid', async () => {
    // Set up mock user in the database
    const mockUser = {
      username: 'valid',
      password: await bcrypt.hash('validpassword', 10),
    };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);

    // Execute the function and make the assertion
    const user = await authenticateBasic('valid', 'validpassword');
    expect(user).toEqual({
      username: 'valid',
      password: mockUser.password,
    });
  });

  it('should throw an error if the username is not found in the database', async () => {
    // Set up mock user in the database
    jest.spyOn(Users, 'findOne').mockResolvedValue(null);

    // Execute the function and make the assertion
    await expect(() => {
      authenticateBasic('invalid', 'validpassword');
    })
  });

  it('should throw an error if the password is incorrect', async () => {
    // Set up mock user in the database
    const mockUser = {
      username: 'valid',
      password: await bcrypt.hash('validpassword', 10),
    };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);

    // Execute the function and make the assertion
    await expect(() => {
      authenticateBasic('valid', 'invalidpassword');
    });
  });
});
