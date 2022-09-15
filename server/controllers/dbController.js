const db = require('../models/dbModel.js');

const dbController = {};

dbController.createUser = async (req, res, next) => {
  try {
    console.log('Creating user...');
    const { name, email } = req.body;
    const values = [name, email];
    const text = `INSERT INTO client (name, email) VALUES ($1, $2)`;
    await db.query(text, values);
    const newUser = await db.query('SELECT * FROM client ORDER BY id DESC LIMIT 1');
    console.log('Successfully registered the following user: ', newUser.rows);
    res.locals.newUser = newUser.rows;
    return next();
  } catch (err) {
    console.log('Error creating user:', err);
    return next({ log: `dbController.createUser error: ${err}`, message: 'Error found in dbController.createUser' });
  }
}

dbController.findUserByName = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const text = `SELECT * FROM client 
    WHERE LOWER(name) LIKE LOWER('%${name}%') 
    or LOWER(email) LIKE LOWER('%${email}%')
    ORDER BY name`;
    const userFound = await db.query(text);

    if (name) console.log(`Successfully located the following user(s) named ${name}:`, userFound.rows);
    else console.log(`Successfully located the following user(s) with the email '${email}':`, userFound.rows[0]);
   
    res.locals.userFound = userFound.rows;
    return next();
  } catch (err) {
    return next({ log: `dbController.findUserByName error: ${error}`, message: 'Error found @ dbControllers.findUserByName' });
  }
}

dbController.findUserById = async (req, res, next) => {
  try {
    console.log('id', req.body.id)
    const { id } = req.body;
    const text = `SELECT * FROM client WHERE id=${id}`;
    const userFound = await db.query(text);
    console.log(`Successfully located the following user with ID #${id}: `, userFound.rows);
    res.locals.userFound = userFound.rows;
    return next();
  } catch (err) {
    return next({ log: `dbController.findUserById error: ${error}`, message: 'Error found @ dbControllers.findUserById' });
  }
}

module.exports = dbController;