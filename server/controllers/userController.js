const db = require('../models/debtlessModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userController = {};


userController.findUserEmail = async (req, res, next) => {
    try{
        const {email} = req.body;
        let findUserEmail = 'SELECT * FROM public.user WHERE public.user.email = $1';
        const data = await db.query(findUserEmail, [email]);
        if (data.rows[0]) {
            return next({
                log: `User with ${email} already exists`,
                message: { err: 'An error occured on userController.findUserEmail: User already exists'}
              });
        } else {
            return next();
        }
    } catch(err) {
        return next({
            log: `userController.findUserEmail middleware ERROR: ${err}`,
            message: { err: 'An error occured on userController.findUserEmail'}
          });
    }
}

userController.hashPassword = (req, res, next) => {
  try{
    const { password } = req.body;
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      req.body.password = hash;
      return next();
    });
  }
  catch (err){
    return next({
      log: `userController.hashPassword middleware ERROR: ${err}`,
      message: { err: 'An error occured on userController.hashPassword'},
    });
  }
};

userController.createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, description, email, monthly_income, monthly_budget, password } = req.body;
    const created_at = new Date();
    let createUserQuery = `INSERT INTO public.user (first_name, last_name, description, email, monthly_income, monthly_budget, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
    const data = await db.query(createUserQuery, [first_name, last_name, description, email, monthly_income, monthly_budget, password, created_at]);

    const user_id = data.rows[0]._id;
    res.locals.user_id = user_id;
    
    return next();
  } catch(err) {
      return next({
        log: `userController.createUser middleware ERROR: ${err}`,
        message: { err: 'An error occured on userController.createUser'}
      });
  }
};

userController.authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let authenticateUserQuery = 'SELECT * FROM public.user WHERE public.user.email = $1';
    const data = await db.query(authenticateUserQuery, [email]);
    // compares password with hashed password
    const verifyPassword = await bcrypt.compare(password, data.rows[0].password);

    // conditional to verify user exists and password is correct
    if (data.rows[0] && verifyPassword) {
      // storing the user id so that we can update the cookie as needed.
      const user_id = data.rows[0]._id;
      res.locals.user_id = user_id;
      return next();
    } else {
      return next({
        log: 'userController.authenticateUser middleware ERROR: User email or password does not match',
        message: { err: 'An error occured on userController.authenticateUser: User email or password does not match'}
      });
    }
  }
  catch(err) {
    return next({
      log:`userController.authenticateUser middleware ERROR: ${err}`,
      message: { err: 'An error occured on userController.authenticateUser'}
    });
  }

}
module.exports = userController;
