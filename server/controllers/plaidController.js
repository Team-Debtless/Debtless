const plaidController = {};

const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
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

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
  ',',
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

plaidController.getLinkToken = async (req, res, next) => {
  const { user_id } = res.locals;
  const clientUserId = String(user_id);
  const request = {
    user: {
      client_user_id: clientUserId,
    },
    client_name: 'Debtless',
    products: PLAID_PRODUCTS,
    language: 'en',
    redirect_uri: process.env.PLAID_REDIRECT_URI === '' ? '' : process.env.PLAID_REDIRECT_URI ,
    country_codes: PLAID_COUNTRY_CODES,
  };
  console.log(request);
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
}


module.exports = plaidController