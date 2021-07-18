const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const results = await Product.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
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
  }
});

// Get a product by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a product by id
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };
  try {
    const product = await Product.findByIdAndUpdate(id, updates, options);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete a product by id
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;