const { Router } = require('express');
const authController = require('../controllers/authController.js');
const dbController = require('../controllers/dbController.js');
// const { exchangeCode, callMeAPI,  callEmailAPI,  verifyUserExists, createUser, userComplete} = require('../controllers/oauthController');

const router = Router();

// localhost:8080/verifyuser
router.get('/', authController.getToken, authController.getUser, dbController.createUser, (req, res) => {
  console.log('Finished fetching user data from GitHub!');
  console.log(res.locals.user)
  console.log('res.locals.user')
  return res.status(200).json(res.locals.user);
});

module.exports = router;