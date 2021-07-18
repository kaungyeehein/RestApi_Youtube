const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  next(new Error('Cannot get a list of products'));
  res.send('getting a list of all products.');
});

router.post('/', (req, res, next) => {
  res.send('product created.');
});

router.get('/:id', (req, res, next) => {
  res.send('get a product.');
});

router.patch('/:id', (req, res, next) => {
  res.send('updated a product.');
});

router.delete('/:id', (req, res, next) => {
  res.send('deleted a product.');
});

module.exports = router;