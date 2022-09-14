const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const server = express();
const PORT = process.env.PORT || 3000; // heroku port || localhost

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser()); // Parses cookies sent with the forms from the frontend
server.use(cors());
// server.use('/public', express.static(path.join(__dirname, '..', 'public')));

server.get('/', (req, res, next) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  // return res.status(200).send('hello world');
});

server.listen(PORT, () => {
	console.log('Server is listening on port ' + PORT);
})