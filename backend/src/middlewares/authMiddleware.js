const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Comprueba que existe un JWT válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Acceso denegado. No se proporcionó un token de autorización.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado.'
    });
  }
};

// Comprueba que el usuario es administrador
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      message: 'Acceso prohibido. Se requieren permisos de Administrador.'
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdmin
};