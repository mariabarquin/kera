const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // En Vercel (serverless) no se usa process.exit: mataría la función entera
    // y el navegador lo mostraría como un falso error de CORS
    console.error(`Error de conexión a MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;