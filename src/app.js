const express = require('express');
const ProductRouter = require('./Routes/Product.route');

const app = express();
app.use('/products', ProductRouter);

// Default 404 error for other routes
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
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

module.exports = app;