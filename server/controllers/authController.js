// const express = require('express');
// const server = express();
const db = require('../models/dbModel.js');
const fetch = require('node-fetch');
const request = require('superagent');
// const axios = require('axios');
// require('dotenv').config();
// const CLIENT_ID = 'b9cb6a79d6b5b3655653';
const CLIENT_ID = 'Iv1.17f49f5c8005c3c4';
// const CLIENT_SECRET = 'b44551fa00c02ac80a15bd2ffebabee5052513ce';
const CLIENT_SECRET = '675442a98307f2fdb4e42870358cce13785b6768';
// axios.get('some link').then(res => res.data)

const authController = {};

authController.getToken = (req, res, next) => {
  console.log('hello from authController.getToken!');
  const { code } = req.query;
  console.log('code:', code)

  // if (!code) {
  //   console.log('code doesnt exist');
  //   return next({error: 'error in getToken: auth code not received'})
  // } else {
  //   res.locals.code = code;
  //   return next();
  // }


  request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      scope: 'user:email',
    })
    .set('Accept', 'application/json')
    .then(function(result) {
      const data = result.body;
      res.locals.data = data;
      res.locals.accessToken = data.access_token;

      console.log('data', res.locals.data);
      return next();
    })
}

authController.getUser = async (req, res, next) => {
  console.log('token:', res.locals.accessToken);

  request
    .get('https://api.github.com/user')
    .set({ 
      'Authorization': `Bearer ${res.locals.accessToken}`,
      'User-Agent': 'Answer.Ing',
      'Accept': "application/vnd.github.v3+json" 
    })
    .then(function(result) {
      console.log('in result');
      const user = result.body;
      res.locals.user = user;
      console.log('user', res.locals.user);
      return next();
    })
}


module.exports = authController;