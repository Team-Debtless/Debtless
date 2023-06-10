const express = require('express');
const router = express.Router();
//Import middleware here
const userController = require('./controllers/userController');

// when user signs up
router.post('/signup', (req, res) => {
  res.status(200).json();
});

//when user logs in
router.post('/login', (req, res) => {
  res.status(200).json();
});

module.exports = router;
