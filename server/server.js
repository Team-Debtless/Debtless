const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

const apiRouter = require('./routes/api');
const plaidRouter = require('./routes/plaid');
// parse incoming requires
app.use(express.json());
// parse incoming req cookies
app.use(cookieParser());

// serve everything in
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(__dirname, '/index.html');
});

app.use('/api', apiRouter);

app.use('/plaid', plaidRouter);

// add a catch all for 404 pages

app.use('*', (req,res) => {
  res.status(404).send('404 page not found');
})

// add a default error handler

app.use((error, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'},
  };
  const errObj = Object.assign({}, defaultErr, error);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));