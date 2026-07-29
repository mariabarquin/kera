const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    category: {
      type: String,
      trim: true
    },
    stock: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // Añade automáticamente fecha de creación y actualización (createdAt, updatedAt)
  }
);

module.exports = mongoose.model('Product', productSchema);