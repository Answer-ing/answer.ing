const path = require('path');
const PORT = 3000;
const express = require('express');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});