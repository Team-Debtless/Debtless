const jwt = require('jsonwebtoken');

const plaidController = {};


const { Configuration, PlaidApi, Products, PlaidEnvironments, CountryCode } = require('plaid');

require('dotenv').config()

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
  ',',
);

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

plaidController.getLinkToken = async (req, res, next) => {
  const clientUserId = String(req.cookies.user_id);
  const request = {
    user: {
      client_user_id: clientUserId,
    },
    client_name: 'Debtless',
    products: [Products.Auth],
    language: 'en',
    redirect_uri: process.env.PLAID_REDIRECT_URI === '' ? '' : process.env.PLAID_REDIRECT_URI ,
    country_codes: [CountryCode.Us],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    res.locals.tokenResponse = createTokenResponse.data;
    return next()
  } catch (error) {
      // handle error
      return next({
        log: `plaidController.getLinkToken middleware ERROR: ${error}`,
        message: { err: 'An error occured on plaidController.getLinkToken' },
      });
  }
};

plaidController.getAccessToken = async (req, res, next) => {
  // const request = {
  //   public_token: publicToken,
  // };
  const { public_token } = req.body;
  const request = {
    public_token,
  };
  try {
    const response = await client.itemPublicTokenExchange(request);
    console.log('response: ', response);
    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    console.log('accessToken: ', accessToken);
    
    const itemId = response.data.item_id;
    
    const token = jwt.sign({ itemId, accessToken }, process.env.DEBTLESS_SECRET, { expiresIn: 60 * 60 });
    // store token as a cookie
    res.cookie('accessToken', token, { httpOnly: true, maxAge: 300000 });
    return next();
  } catch (error) {
     return next({
      log: `plaidController.getAccessToken middleware ERROR: ${error}`,
      message: { err: 'An error occured on plaidController.getAccessToken' },
    });
  }
};


module.exports = plaidController