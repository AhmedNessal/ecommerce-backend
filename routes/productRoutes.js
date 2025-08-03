import express from 'express';
import { listProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
export default router;