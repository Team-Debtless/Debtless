const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const plaidController = require('../controllers/plaidController');

router.post(
  '/create_link_token', 
  plaidController.getLinkToken,
  (req, res) => {
    res.status(200).json(res.locals.tokenResponse);
  }
);

router.post(
  '/exchange_public_token',
  plaidController.getAccessToken,
  (req, res) => {
    // Access token attached to a signed jwt inside cookie labeled 'accessToken'
    res.json({ public_token_exchange: 'complete' });
  }
);
module.exports = router;