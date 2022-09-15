const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send('hello world!');
})

router.get('/signin', authController.getToken, authController.getUser, (req, res) => {
  console.log('done!');
  return res.status(200).send(res.locals.data);
})

module.exports = router;