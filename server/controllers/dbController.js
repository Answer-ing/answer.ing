const db = require('../models/dbModel.js');

const dbController = {};

dbController.createUser = async (req, res, next) => {
  try {
    const values = ['Crystal', 'crystal.agoncillo@gmail.com', ''];
    const text = 'INSERT INTO user (name, email, created_at) VALUES ($1, $2, $3)';
    await db.query(text, values);
    const newUser = await db.query('SELECT * FROM user ORDER BY id DESC LIMIT 1');
    console.log('result: ', newUser.rows);
    res.locals.newUser = newUser.rows;
    return next();
  } catch (err) {
    console.log('error:', err);
    return next({ log: `dbController.createUser error: ${err}`, message: 'Error found in dbController.createUser' });
  }
}