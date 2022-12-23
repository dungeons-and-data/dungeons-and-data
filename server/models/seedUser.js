const Users = require('./User');

function seed() {
  Users.insertMany([
    {
      username: 'testUser1',
      password: 'password1',
      role: 'dungeon-master',
    },
    {
      username: 'testUser2',
      password: 'password2',
      role: 'hero',
    },
  ], (error, users) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Seeded the users collection with ${users.length} users.`);
    }
  });
}

seed();