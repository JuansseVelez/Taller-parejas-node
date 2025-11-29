import rateLimit from 'express-rate-limit';

// Rate limiter para rutas de autenticación

// Limita a 5 intentos por minuto para evitar ataques de fuerza bruta
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5, // Máximo 5 peticiones por ventana de tiempo
  message: {
    error: 'Demasiados intentos de autenticación. Por favor, intenta de nuevo en 1 minuto.'
  },
  standardHeaders: true, // Devuelve info del rate limit en los headers `RateLimit-*`
  legacyHeaders: false, // Desactiva los headers `X-RateLimit-*`
});

// Rate limiter para rutas de tareas (opcional pero recomendado)

// Limita a 100 peticiones por 15 minutos para evitar abuso
export const tasksLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por ventana de tiempo
  message: {
    error: 'Demasiadas peticiones. Por favor, intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});