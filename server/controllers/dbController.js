const db = require('../models/dbModel.js');

const dbController = {};

dbController.createUser = async (req, res, next) => {
  try {
    console.log('Creating user...');
    const { name, id } = res.locals.user;
    const values = [name, id];
    const text = `INSERT INTO client (name, user_id) VALUES ($1, $2)`;
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
};

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

dbController.postQuestion = async (req, res, next) => {
  try {
    console.log('starting postQuestion');
    const userId = req.cookies;
    const { question, company } = req.body;
    // check if the company exists by name
    //   if so, use that company ID for the insert
    //   if not, create a new company
    //   then query for that company to get the ID
    // create a new question
    // finally, create a new question_company row to associate the two
    const matchingCompany = await db.query('SELECT id FROM company WHERE lower(name) = $1;', [company.toLowerCase()]);
    console.log('matchingCompany:');
    console.log(matchingCompany.rows);
    let companyId;
    if (!matchingCompany.rows[0]) {
      const createCompanyResult = await db.query('INSERT INTO company (client_id, name) VALUES ($1, $2);', [userId, company]);
      const newCompany = await db.query('SELECT id FROM company WHERE name = $1;', [company]);
      console.log('newCompany result:');
      console.log(newCompany.rows);
      companyId = newCompany.rows[0];
    } else {
      companyId = matchingCompany.rows[0];
    }

    const newQuestionText = 'INSERT INTO question (created_by, text) VALUES ($1, $2);';
    const newQuestion = await db.query(newQuestionText, [userId, question]);
    console.log(newQuestion);
    const newQuestionId = await db.query('SELECT id FROM question ORDER BY created_at DESC LIMIT 1;');
    const newQuestionCompany = await db.query(`INSERT INTO question_company (question_id, company_id) VALUES (${newQuestionId}, ${companyId});`);
    console.log(newQuestionCompany);
    return next();
  } catch (err) {
    return next({ log: `dbController.postQuestion error: ${error}`, message: 'Error found @ dbControllers.postQuestion' });
  }
}

dbController.getQuestions = async (req, res, next) => {
  try {
    // add conditional logic using query for when we implement search
    const text = `SELECT 
        question.id,
        question.text AS question_text,
        client.name AS username,
        latest_company.company_count,
        latest_company.latest_company_timestamp,
        company.name AS company_name,
        count(answer.id) AS answer_count,
        max(answer.created) as latest_answer_timestamp
      FROM 
        QUESTION
      JOIN CLIENT ON QUESTION.CLIENT_ID = CLIENT.ID
      LEFT JOIN (select count(*) as company_count, max(created_at) as latest_company_timestamp, question_id from question_company group by question_id) latest_company
        ON latest_company.question_id = question.id
      LEFT JOIN company on latest_company.created_at = company.created_at
      LEFT JOIN answer on answer.question_id = question.id
      GROUP BY 
        question.id,
        question.text,
        client.name,
        latest_company.company_count,
        latest_company.latest_company_timestamp,
        company.name;
    `;
    questions = await db.query(text);
    res.locals.questions = questions.rows;
    console.log(res.locals.questions);
    return next();
  } catch (err) {
    return next({ log: `dbController.getQuestions error: ${error}`, message: 'Error found @ dbControllers.getQuestions' });
  }
};

module.exports = dbController;
