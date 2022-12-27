const { diffRole } = require('../../axios/roleChange');

const axios = require('axios');

let url = process.env.URL || 'http://localhost:3001';

jest.mock('axios');

describe('diffRole function', () => {
  test('returns correct data when called with valid input', async () => {
    // Set up the mock to return a successful response
    axios.put.mockResolvedValue({ data: 'Success' });

    // Set up the user object and change role value
    const user = { id: '123', token: '456' };
    const change = 'admin';

    // Call the diffRole function and assert that the return value is correct
    const result = await diffRole(user, change);
    expect(result).toBe('Success');

    // Assert that the mock was called with the correct arguments
    expect(axios.put).toHaveBeenCalledWith(
      `${url}users/${user.id}`,
      { username: user.username, password: user.password, role: change },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  });
});
