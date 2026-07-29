/*
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// Middleware para que Express entienda datos en formato JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.json({ message: '¡API de KERA funcionando correctamente!' });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
*/

require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Conectar a MongoDB Atlas
connectDB();

// Ruta de bienvenida básica
app.get('/', (req, res) => {
  res.json({ message: '¡API RESTful de KERA funcionando correctamente!' });
});

// Rutas principales de la API
app.use('/api/products', productRoutes);

// Middlewares de Error (IMPORTANTE: Deben ir siempre al final de todas las rutas)
app.use(notFound);
app.use(errorHandler);

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});