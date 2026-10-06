require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');


const productRoutes = require('./src/routes/productRoutes'); 

const userRoutes = require('./src/routes/userRoutes');

const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

const app = express();
// Opción simple para permitir peticiones durante desarrollo:
app.use(cors());

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
app.use('/api/users', userRoutes);

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