const db = require('../models/debtlessModel');

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

userController.createUser = async (req, res, next) => {
try {
  const { first_name, last_name, description, email, monthly_income, monthly_budget, password } = req.body;
  let createUserQuery = `INSERT INTO public.user (first_name, last_name, description, email, monthly_income, monthly_budget, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const data = await db.query(createUserQuery, [first_name, last_name, description, email, monthly_income, monthly_budget, password]);

  const userId = data.rows[0]._id;
  res.locals.userId = userId;
  
  return next();
} catch(err) {
    return next({
      log: `userController.createUser middleware ERROR: ${err}`,
      message: { err: 'An error occured on userController.createUser'}
    });
}
};
    
module.exports = userController;
