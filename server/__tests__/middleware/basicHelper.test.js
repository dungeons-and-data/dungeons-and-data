const authenticateBasic = require('../../middleware/auth/helpers/authenticateBasic');
const Users = require('../../models/User');
const bcrypt = require('bcrypt');





describe('authenticateBasic', () => {


  it('should return the user if the username and password are valid', async () => {

    const mockUser = {
      username: 'valid',
      password: await bcrypt.hash('validpassword', 10),
    };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);

    const user = await authenticateBasic('valid', 'validpassword');
    expect(user).toEqual({
      username: 'valid',
      password: mockUser.password,
    });
  });

  it('should throw an error if the username is not found in the database', async () => {

    jest.spyOn(Users, 'findOne').mockResolvedValue(null);

    await expect(() => {
      authenticateBasic('invalid', 'validpassword');
    })
  });

  it('should throw an error if the password is incorrect', async () => {

    const mockUser = {
      username: 'valid',
      password: await bcrypt.hash('validpassword', 10),
    };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);

    await expect(() => {
      authenticateBasic('valid', 'invalidpassword');
    });
  });
});
