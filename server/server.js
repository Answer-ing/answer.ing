const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');

const server = express();
const PORT = process.env.PORT || 3000; // heroku port || localhost
// const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser()); // Parses cookies sent with the forms from the frontend
server.use(cors());

// server.use('/login', authRouter);
server.use('/', verifyRouter);
// server.use('/', userRouter);

// catch-all route handler for any requests to an unknown route
server.use('*', (req, res) => res.sendStatus(404));

// global error handler
server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  res.status(errorObj.status).send(errorObj.message);
});

server.listen(PORT, () => {
	console.log('Server is listening on port ' + PORT);
});