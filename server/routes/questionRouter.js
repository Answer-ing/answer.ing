const express = require('express');
const dbController = require('../controllers/dbController.js');

const router = express.Router();

router.get('/', dbController.getQuestions, (req, res) => {
  res.status(200).json(res.locals.questions);
});

router.post('/', dbController.postQuestion, (req, res) => {
  console.log('got here');
  res.send(200);
});

module.exports = router;
