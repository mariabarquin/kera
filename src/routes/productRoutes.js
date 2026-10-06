const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Importamos los middlewares de autorización
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Rutas principales (/api/products)
router.route('/')
  .get(getAllProducts)                                     // Pública: cualquier visitante puede ver productos
  .post(verifyToken, verifyAdmin, createProduct);          // Protegida: solo administradores pueden crear

// Rutas con ID (/api/products/:id)
router.route('/:id')
  .get(getProductById)                                     // Pública: ver detalle del producto
  .put(verifyToken, verifyAdmin, updateProduct)            // Protegida: solo administradores pueden editar
  .delete(verifyToken, verifyAdmin, deleteProduct);        // Protegida: solo administradores pueden eliminar

module.exports = router;