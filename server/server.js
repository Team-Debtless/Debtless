const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

const apiRouter = require('./routes/api');
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

// add a catch all for 404 pages

// add a default error handler

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
