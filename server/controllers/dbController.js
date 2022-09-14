const db = require('../models/dbModel.js');

const dbController = {};

dbController.createUser = async (req, res, next) => {
  try {
    console.log('Creating user...');
    const {
      name,
      email
    } = req.body;
    console.log('req.body:', req.body);
    const values = [name, email];
    // const text = `INSERT INTO client (name, email) VALUES ('${name}', '${email}');`;
    // console.log('QUERY', text);
    // const newUser = await db.query(text);
    const text = `INSERT INTO client (name, email) VALUES ($1, $2)`;
    await db.query(text, values);
  
    // console.log(newUser);
    // res.locals.newUser = newUser;
    const newUser = await db.query('SELECT * FROM client ORDER BY id DESC LIMIT 1');
    console.log('result: ', newUser.rows);
    res.locals.newUser = newUser.rows;
    return next();
  } catch (err) {
    console.log('Error creating user:', err);
    return next({ log: `dbController.createUser error: ${err}`, message: 'Error found in dbController.createUser' });
  }
}

module.exports = dbController;