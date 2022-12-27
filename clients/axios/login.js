const { logInMenu, loginReq, signupReq } = require('../inquirer/login');
const axios = require('axios');
let url = process.env.URL || 'http://localhost:3001/';

const loginChoice = async () => {
  let response = await logInMenu();
  let user;
  try {

    if (response === 'LOGIN') {
      let logInData = await loginReq();
      let axiosRes = await axios.post(`${url}login`, {}, {
        auth: {
          username: logInData.username,
          password: logInData.password,
        },
      });
      user = axiosRes.data;

    } else if (response === 'SIGNUP') {
      let logInData = await signupReq();
      let axiosRes = await axios.post(`${url}signup`, logInData);
      user = axiosRes.data;

    } else {
      return;
    }
  } catch (e) {
    console.log(e.message);
    console.log('INVALID LOGIN');
    return loginChoice();
  }
  return user;
};
module.exports = loginChoice;
