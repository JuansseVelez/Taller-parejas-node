import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  
    // 1. Obtener el header Authorization
  const authHeader = req.headers.authorization;

  // 2. Verificar que existe el header
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // 3. Extraer el token (viene como "Bearer TOKEN")
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  // 4. Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. Guardar la información del usuario en req.user
    req.user = { userId: Number(decoded.sub) };
    
    // 6. Continuar con la siguiente función (controlador)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export default authMiddleware;