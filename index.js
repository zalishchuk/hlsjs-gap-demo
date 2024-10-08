const express = require('express');
const path = require('path');

const app = express();

const ENABLE_FRAG_LOAD_ERROR_TEST = true;
const ENABLE_FRAG_PARSING_ERROR_TEST = false;

const targetFragmentsList = ['/7.ts'];

app.use('/public', (req, res, next) => {
  if (ENABLE_FRAG_LOAD_ERROR_TEST && targetFragmentsList.includes(req.url)) {
    return res.sendStatus(500);
  }

  if (ENABLE_FRAG_PARSING_ERROR_TEST && targetFragmentsList.includes(req.url)) {
    return res.status(200).send('invalid data');
  }

  next();
});

app.use('/public', express.static(path.resolve(__dirname, 'src', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
