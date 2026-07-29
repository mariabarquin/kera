require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

// OJO AQUÍ: Asegúrate de que el nombre del archivo dentro de /src/routes sea exacto
// Si tu archivo se llama productRoutes.js usa './src/routes/productRoutes'
// Si se llama product.routes.js cambia la línea de abajo a './src/routes/product.routes'
const productRoutes = require('./src/routes/productRoutes'); 

const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middleware para entender JSON
app.use(express.json());

// Ruta de bienvenida básica
app.get('/', (req, res) => {
  res.json({ message: '¡API RESTful de KERA funcionando correctamente!' });
});

// Rutas principales de la API
app.use('/api/products', productRoutes);

// Middlewares de Error
app.use(notFound);
app.use(errorHandler);

// Solo escuchar puerto en entorno LOCAL (no en Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

// Exportar para Vercel
module.exports = app;