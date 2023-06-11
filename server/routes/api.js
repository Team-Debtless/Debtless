const express = require('express');
const router = express.Router();
//Import middleware here
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const dataController = require('../controllers/dataController');

/*
  routes user sign in
*/
router.post('/signup', userController.findUserEmail, userController.hashPassword, userController.createUser, cookieController.setUserCookie, (req, res) => {
  res.status(200).json({ message: 'User created succesfully' });
});

/*
  routes user log in
*/
router.post('/login', userController.authenticateUser, cookieController.setUserCookie, (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});

/*
  routes add an expense to db
*/
router.post('/expense', dataController.addExpense, (req, res) => {
  res.status(200).json({ message: 'Expense added sucessfully' });
});
module.exports = router;
