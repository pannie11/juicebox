const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');

// usersRouter.use((req, res, next) => {
//   console.log("A request is being made to /users");

//   res.send({ message: 'hello from /users!' });
// });

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); 
});

usersRouter.get('/', (req, res) => {
  const users = getAllUsers();

  res.send({
    users //actual users not returning, but async/await gives an error and crashes nodemon
  });
});

module.exports = usersRouter;