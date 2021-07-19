const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const ProductRouter = require('./Routes/Product.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/test', (req, res) => {
  res.send(req.body);
});

app.use('/products', ProductRouter);

// Default 404 error for other routes
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// Default error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// dbName: 'RestAPI'
// user: 'admin'
// pass: 'admin'
mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'RestAPI',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Mongodb: connected...');
}).catch(err => {
  console.log('Mongodb: ' + err.message);
});

module.exports = app;