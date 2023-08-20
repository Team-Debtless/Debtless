const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const plaidController = require('../controllers/plaidController');

router.post('/create_link_token', 
  userController.authenticateUser, 
  cookieController.setUserCookie, 
  plaidController.getLinkToken,
  (req, res) => {
    res.status(200).json(res.locals.tokenResponse);
  }
);


module.exports = router;