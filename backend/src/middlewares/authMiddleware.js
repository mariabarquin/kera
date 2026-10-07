const jwt = require('jsonwebtoken');

// Validar que la petición incluya un token de sesión válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token de autorización.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_kera');
    req.user = decoded; // Adjunta { id, role } a la petición
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

// Validar que el usuario tenga rol de Administrador
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso prohibido. Se requieren permisos de Administrador.' });
  }
};

module.exports = { verifyToken, verifyAdmin };