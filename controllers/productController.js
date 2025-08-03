import Product from '../models/Product.js';

export const listProducts = async (req, res, next) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) throw { statusCode: 404, message: 'Product not found' };
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, countInStock } = req.body;
    if (!name || price == null) throw { statusCode: 400, message: 'Name and price required' };
    const newItem = await Product.create({ name, description, price, countInStock });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) throw { statusCode: 404, message: 'Product not found' };
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) throw { statusCode: 404, message: 'Product not found' };
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};