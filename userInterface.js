'use strict';
const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const admin = ['create', 'get one', 'get all', 'update', 'delete', 'exit'];
const user = ['get one', 'get all', 'update', 'create', 'exit'];
const guest = ['get one', 'get all', 'exit'];




async function crudStuff(rolePermissions, userData, carsOrTrucks = '') {
  let category = userData.vehicleType;
  if (userData.role === 'admin') {
    category = carsOrTrucks;
  } else {
    console.log();
    console.log();
    console.log(`${category.toUpperCase()} MENU`);
  }
  const inquirerRunning = true;
  try {
    while (inquirerRunning) {

      const continueCrud = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'continue',
            message: `Would you like to interface with ${category}s?`,
            choices: ['yes', 'no'],
          },
        ]);
      if (continueCrud.continue === 'no') {
        if (userData.role === 'admin') {
          return await afterLogin(userData, rolePermissions);
        } else {
          return startScript();
        }
      }


      const pickCrud = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'pickCrud',
            message: 'Which operation would you like to conduct?',
            choices: rolePermissions,
          },
        ]);

      if (pickCrud.pickCrud === 'create') {
        await createVehicle(userData, category);
      } else if (pickCrud.pickCrud === 'get one') {
        await getVehicle(userData, category, true, rolePermissions);
        return await afterLogin(userData, rolePermissions);
      } else if (pickCrud.pickCrud === 'update') {
        await updateVehicle(userData, category);
      } else if (pickCrud.pickCrud === 'delete') {
        await deleteVehicle(userData, category);
      } else if (pickCrud.pickCrud === 'get all') {
        await getVehicle(userData, category, false, rolePermissions);
        return await afterLogin(userData, rolePermissions);
      } else {
        return await afterLogin(userData, rolePermissions);
      }
    }

  } catch (e) {
    console.log(e);
  }
}


async function createVehicle(userData, category) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const newData = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'make',
        message: 'Please input a "make" for the vehicle',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Please input a new "model" for the vehicle',
      },
    ]);

  const body = {
    make: newData.make,
    model: newData.model,
    type: category,
  };
  const newVehicle = await axios.post(`${SERVER_URL}${category}s`, body, config);

  console.log(newVehicle.data);


}


async function getVehicle(userData, category, getOne = false, rolePermissions) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.get(`${SERVER_URL}${category}s`, config);
  if (!getOne) return console.log(data.data);
  const vehicles = data.data.map(vehicle => `${vehicle.id}. Make: ${vehicle.make}
     Model: ${vehicle.model}`);

  vehicles.push('exit');
  const whichVehicle = await inquirer
    .prompt([
      {
        type: 'list',
        name: `vehicle`,
        message: 'Please choose an option',
        choices: vehicles,
      },
    ]);


  if (whichVehicle.vehicle === 'exit') return;

  const id = whichVehicle.vehicle.split('.').at(0);

  const oneVehicle = await axios.get(`${SERVER_URL}${category}s/${id}`, config);
  console.log(oneVehicle.data);
}


async function updateVehicle(userData, category) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.get(`${SERVER_URL}${category}s`, config);

  const vehicles = data.data.map(vehicle => `${vehicle.id}. Make: ${vehicle.make}
     Model: ${vehicle.model}`);

  vehicles.push('exit');
  const whichVehicle = await inquirer
    .prompt([
      {
        type: 'list',
        name: `vehicle`,
        message: 'Which vehicle would you like to update?',
        choices: vehicles,
      },
    ]);


  if (whichVehicle.vehicle === 'exit') return;

  const id = whichVehicle.vehicle.split('.').at(0);
  console.log();
  console.log(whichVehicle.vehicle + ': currently selected for update');
  const newData = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'make',
        message: 'Please input a new "make"',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Please input a new "model"',
      },
    ]);

  const body = {
    make: newData.make,
    model: newData.model,
    type: category,
  };
  const updatedVehicle = await axios.put(`${SERVER_URL}${category}s/${id}`, body, config);

  console.log(updatedVehicle.data);
}

async function deleteVehicle(userData, category) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.get(`${SERVER_URL}${category}s`, config);

  const vehicles = data.data.map(vehicle => `${vehicle.id}. Make: ${vehicle.make}
     Model: ${vehicle.model}`);

  vehicles.push('exit');
  const whichVehicle = await inquirer
    .prompt([
      {
        type: 'list',
        name: `vehicle`,
        message: 'Which vehicle would you like to delete?',
        choices: vehicles,
      },
    ]);


  if (whichVehicle.vehicle === 'exit') return;




  const id = whichVehicle.vehicle.split('.').at(0);
  console.log();

  const confirm = await inquirer
    .prompt([{
      type: 'list',
      name: 'confirm',
      message: `Are you sure you want to delete ${whichVehicle.vehicle}?`,
      choices: ['no', 'yes'],
    }]);

  if (confirm.confirm === 'no') return await deleteVehicle(userData, category);

  await axios.delete(`${SERVER_URL}${category}s/${id}`, config);
  console.log();
  console.log();
  console.log();
  console.log(whichVehicle.vehicle, 'has been successfully deleted');
}

async function performLogin(loginData) {
  try {
    const url = `${SERVER_URL}signin`;
    const data = await axios.post(url, {}, {
      auth: {
        username: loginData.username,
        password: loginData.password,
      },
    });
    return data;
  } catch (e) {
    console.log(e.message);
    return startScript();
  }
}

async function performSignup(loginData) {
  const url = `${SERVER_URL}signup`;
  const data = await axios.post(url, {
    username: loginData.username,
    password: loginData.password,
    vehicleType: loginData.vehicleType.toLowerCase(),
  });

  return data;
}

async function afterLogin(userData, rolePermissions) {
  if (userData.role === 'admin') {
    console.log('ADMIN MENU');
    const nextStepsAdmin = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Please choose an option.',
          choices: ['Access User Data', 'Access Truck Data', 'Access Car Data', 'Exit'],
        },
      ]);
    if (nextStepsAdmin.choice === 'Exit') {
      return startScript();
    } else if (nextStepsAdmin.choice === 'Access User Data') {
      await adminUser(userData);
    } else if (nextStepsAdmin.choice === 'Access Truck Data') {
      await crudStuff(rolePermissions, userData, 'truck');
    } else if (nextStepsAdmin.choice === 'Access Car Data') {
      await crudStuff(rolePermissions, userData, 'car');
    }
  } else {
    await crudStuff(rolePermissions, userData);
  }
}

async function getUsers(userData) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(`${SERVER_URL}users`, config);
  console.log(data.data);
  adminUser(userData);
}

async function getOneUser(userData) {
  const { token } = userData;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = await axios.get(`${SERVER_URL}users`, config);
  const userIds = data.data.map(users => ({
    [users.username]: users.id,
  }));
  console.log('Enter "exit" to go back to main menu');
  const userToFind = await inquirer
    .prompt([{
      type: 'input',
      name: 'user',
      message: 'Enter username to search.',
    }]);

  if (userToFind.user.toLocaleLowerCase() === 'exit') return await afterLogin(userData, admin);

  const foundUser = userIds.filter(user => {
    return Object.keys(user)[0].toLocaleLowerCase() === userToFind.user.toLocaleLowerCase();
  });
  if (!foundUser.length) {
    console.log(`${userToFind.user} not found!`);
    return await getOneUser(userData);
  }
  const [id] = Object.values(foundUser[0]);

  const gotOne = await axios.get(`${SERVER_URL}users/${id}`, config);
  console.log();
  console.log();
  console.log(gotOne.data);
  console.log();
  return await afterLogin(userData, admin);
}
async function deleteUser(userData) {
  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(`${SERVER_URL}users`, config);
  const userNames = data.data.map(users => users.username);
  const userIds = data.data.map(users => ({
    [users.username]: users.id,
  }));

  userNames.push('Exit');
  const userToDelete = await inquirer
    .prompt([{
      type: 'list',
      name: 'user',
      message: 'Please choose an user to delete.',
      choices: userNames,
    }]);

  if (userToDelete.user === 'Exit') return await afterLogin(userData, admin);
  const foundUser = userIds.filter(user => {
    return Object.keys(user)[0] === userToDelete.user;
  });
  const [id] = Object.values(foundUser[0]);

  const confirm = await inquirer
    .prompt([{
      type: 'list',
      name: 'confirm',
      message: `Are you sure you want to delete ${userToDelete.user}?`,
      choices: ['no', 'yes'],
    }]);

  if (confirm.confirm === 'no') return await deleteUser(userData);

  const status = await axios.delete(`${SERVER_URL}users/${id}`, config);
  console.log();
  console.log();
  console.log(status.data.status);
  console.log();
  console.log(userToDelete.user, 'has been successfully deleted');
  console.log();
  console.log();
  return await afterLogin(userData, admin);
}
async function updateUser(userData) {

  const { token } = userData;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(`${SERVER_URL}users`, config);
  const userNames = data.data.map(users => users.username);
  const userIds = data.data.map(users => ({
    [users.username]: users.id,
  }));

  userNames.push('Exit');
  const userToUpdate = await inquirer
    .prompt([{
      type: 'list',
      name: 'user',
      message: 'Please choose an option.',
      choices: userNames,
    }]);

  if (userToUpdate.user === 'Exit') return await afterLogin(userData, admin);
  const foundUser = userIds.filter(user => {
    return Object.keys(user)[0] === userToUpdate.user;

  });
  const [id] = Object.values(foundUser[0]);

  const body = await inquirer
    .prompt([{
      type: 'input',
      name: 'username',
      message: `What will ${userToUpdate.user}'s name be?`,
    },
    {
      type: 'list',
      name: 'role',
      message: `What will ${userToUpdate.user}'s role be?`,
      choices: ['user', 'guest', 'admin'],
    },
    {
      type: 'list',
      name: 'vehicleType',
      message: `What will ${userToUpdate.user}'s vehicle type be?`,
      choices: ['car', 'truck', 'both'],
    },
    ]);

  const updatedUser = await axios.put(`${SERVER_URL}users/${id}`, body, config);
  console.log();
  console.log();
  console.log(updatedUser);
  console.log();
  console.log(updatedUser.data.username, 'has been successfully updated');
  console.log();
  console.log();
  return await afterLogin(userData, admin);
}

async function guestLogin() {
  const carsOrTrucks = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Do you want to view cars or trucks?',
        choices: ['Cars', 'Trucks'],
      },
    ]);

  if (carsOrTrucks.choice === 'Cars') {
    const loginData = {
      username: 'guestCar',
      password: 'password7',
    };
    const userData = await performLogin(loginData);

    await afterLogin(userData.data, guest);
  } else {
    const loginData = {
      username: 'guestTruck',
      password: 'password7',
    };
    const userData = await performLogin(loginData);
    await afterLogin(userData.data, guest);
  }

}

async function adminUser(userData) {
  const userQs = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'users',
        message: 'Please choose an option.',
        choices: ['Get Users', 'Delete User', 'Update User', 'Get One User', 'Exit'],
      },
    ]);

  if (userQs.users === 'Exit') {
    await afterLogin(userData, admin);
  } else if (userQs.users === 'Get Users') {
    await getUsers(userData);
  } else if (userQs.users === 'Delete User') {
    await deleteUser(userData);
  } else if (userQs.users === 'Update User') {
    await updateUser(userData);
  } else if (userQs.users === 'Get One User') {
    await getOneUser(userData);
  }
}

async function startScript() {
  const loginQuestion = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'start',
        message: 'Please choose an option.',
        choices: ['Login', 'Signup', 'View Application', 'Exit'],
      },
    ]);
  if (loginQuestion.start === 'Exit') {
    console.log('Exiting');
    return;
  } else if (loginQuestion.start === 'Login') {
    const loginData = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'username',
          message: 'What is your username?',
        },
        {
          type: 'password',
          name: 'password',
          message: 'What is your password?',
        },
      ]);

    const userDataResponse = await performLogin(loginData);

    if (!userDataResponse) return;
    const userData = {
      vehicleType: userDataResponse.data.vehicleType,
      role: userDataResponse.data.role,
      token: userDataResponse.data.token,
    };
    let rolePermissions;
    if (userData.role === 'admin') {
      rolePermissions = admin;
    } else if (userData.role === 'user') {
      rolePermissions = user;
    } else if (userData.role === 'guest') {
      rolePermissions = guest;
    }

    await afterLogin(userData, rolePermissions);


  } else if (loginQuestion.start === 'Signup') {
    const loginData = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Please choose your username.',
        },
        {
          type: 'password',
          name: 'password',
          message: 'Choose a your password.',
        },
        {
          type: 'list',
          name: 'vehicleType',
          message: 'choose your favorite vehicle type.',
          choices: ['Car', 'Truck'],
        },
      ]);

    const userDataResponse = await performSignup(loginData);

    if (!userDataResponse) return;
    const userData = {
      vehicleType: userDataResponse.data.vehicleType,
      role: userDataResponse.data.role,
      token: userDataResponse.data.token,
    };
    let rolePermissions;
    if (userData.role === 'admin') {
      rolePermissions = admin;
    } else if (userData.role === 'user') {
      rolePermissions = user;
    }
    await crudStuff(rolePermissions, userData);
  } else if (loginQuestion.start === 'View Application') {
    guestLogin();
  }

}

startScript();

