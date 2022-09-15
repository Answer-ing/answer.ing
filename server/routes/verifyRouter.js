const { Router } = require('express');
const authController = require('../controllers/authController.js');
// const { exchangeCode, callMeAPI,  callEmailAPI,  verifyUserExists, createUser, userComplete} = require('../controllers/oauthController');

const router = Router();

// localhost:8080/verifyuser
router.get('/', authController.getToken, authController.getUser, (req, res) => {
  // return res.redirect('/');
  console.log('hello from final func in /verifyuser GET request');
  return res.sendStatus(200);
  //.redirect('/');
});

module.exports = router;