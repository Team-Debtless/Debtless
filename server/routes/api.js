const express = require('express');
const router = express.Router();
//Import middleware here
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const dataController = require('../controllers/dataController');

/*
  routes user sign in
*/
router.post(
  '/signup',
  userController.findUserEmail,
  userController.hashPassword,
  userController.createUser,
  cookieController.setUserCookie,
  (req, res) => {
    res.status(200).json({ message: 'User created succesfully' });
  }
);

/*
  routes user log in
*/
router.post(
  '/login',
  userController.authenticateUser,
  cookieController.setUserCookie,
  (req, res) => {
    res.status(200).json({ message: 'Login successful' });
  }
);

/*
  routes add an expense to db
*/
router.post('/expense', dataController.addExpense, (req, res) => {
  const { expense } = res.locals;
  res.status(200).json({ message: 'Expense added sucessfully', expense: expense });
});

/*
  routes get expenses of user from db
*/
router.get('/expense', dataController.getExpenses, (req, res) => {
  const { expenses } = res.locals;
  res.status(200).json({ expenses: expenses }); // send expenses
});

/*
  routes get monthly spend vs monthly budget
*/
router.get('/dashboard', dataController.getBudgetIncome, dataController.getExpenses, dataController.sumMonthlyExpense, (req, res) => {
  const { budgetIncome, monthlyExpense } = res.locals;

  //maybe shorten this to data? idk
  res.status(200).json({ budgetIncome: budgetIncome, monthlyExpense: monthlyExpense });
/*
  routes get expenses of user from db
*/
router.get('/expense', dataController.getExpenses, (req, res) => {
  const { expenses } = res.locals;
  res.status(200).json({ expenses: expenses }); // send expenses
});

module.exports = router;
