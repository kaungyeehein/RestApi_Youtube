const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');

const Product = require('../Models/Product.model');

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const results = await Product.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Create a product
router.post('/', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});

// Get a product by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product id.'));
      return;
    }
    next(error);
  }
});

// Update a product by id
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };
  try {
    const product = await Product.findByIdAndUpdate(id, updates, options);
    if (!product) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product id.'));
      return;
    }
    next(error);
  }
});

// Delete a product by id
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product id.'));
      return;
    }
    next(error);
  }
});

module.exports = router;