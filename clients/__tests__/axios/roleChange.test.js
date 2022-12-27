const { diffRole } = require('../../axios/roleChange');

const axios = require('axios');

let url = process.env.URL || 'http://localhost:3001';

jest.mock('axios');

describe('diffRole function', () => {
  test('returns correct data when called with valid input', async () => {

    axios.put.mockResolvedValue({ data: 'Success' });

    const user = { id: '123', token: '456' };
    const change = 'admin';

    const result = await diffRole(user, change);
    expect(result).toBe('Success');
    expect(axios.put).toHaveBeenCalledWith(
      `${url}users/${user.id}`,
      { username: user.username, password: user.password, role: change },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  });
});
