const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send('hello world!');
})

router.get('/register', (req, res) => {
  return res.status(200).send('User Registration Page');
})

router.post('/register', dbController.createUser, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

router.post('/id', dbController.findUserById, (req, res) => {
  return res.status(201).json(res.locals.userFound);
});

router.post('/name', dbController.findUserByName, (req, res) => {
  return res.status(201).json(res.locals.userFound);
});

module.exports = router;