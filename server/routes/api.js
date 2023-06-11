const express = require('express');
const router = express.Router();
//Import middleware here
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

// when user signs up
router.post('/signup', userController.findUserEmail, userController.hashPassword, userController.createUser, cookieController.setUserCookie, (req, res) => {
  res.status(200).json({ message: 'User created succesfully' });
});

//when user logs in
router.post('/login', userController.authenticateUser, cookieController.setUserCookie, (req, res) => {
  res.status(200).json({ message: 'Login successful'});
});

// when user wants to add expense

module.exports = router;
