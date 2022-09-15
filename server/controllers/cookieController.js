const express = require('express');
const server = express();
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_PW;
// axios.get('some link').then(res => res.data)

let id_token;
function onSignIn(googleUser) {
  id_token = googleUser.getAuthResponse().id_token;
}
// What if we put vvv in ^^^ to prevent global variable???
axios.post('/signin', {
  headers: { ContentType: 'application/x-www-form-urlencoded' },
  id_token: id_token
});

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}



verify().catch(console.error);

module.exports = { onSignIn };