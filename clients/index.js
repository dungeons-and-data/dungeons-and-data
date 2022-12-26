'use strict';
const axios = require('axios');
const {logInMenu, loginReq, signupReq} = require('./UI/login');
let url = process.env.URL || 'http://localhost:3001'
let loginChoice = async() => {
  let response = await login();
  if(response === 'LOGIN'){
    let logInData = await loginReq();
    let axiosRes = await axios.post(`${url}/login`, logInData)
    console.log(axiosRes);
  }else if(response === ''){

  }else{
    return;
  }
}
loginChoice();