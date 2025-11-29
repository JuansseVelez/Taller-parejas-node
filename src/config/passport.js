import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../prismaClient.js';

// Opciones de configuración para la estrategia JWT

const options = {
  
  // Extraer el token del header Authorization como Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 
  // Secret key para verificar el token (debe ser la misma que usamos al crear el token)
  secretOrKey: process.env.JWT_SECRET,
};

// Definir la estrategia JWT

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {

      // Buscar el usuario en la base de datos usando el 'sub' del payload

      // 'sub' es el estándar JWT para el ID del usuario

      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub }
      });

      // Si el usuario existe, lo pasamos al siguiente middleware
     
      if (user) {
        return done(null, user);
      }
      
      // Si no existe el usuario, devolvemos false
      
      return done(null, false);
    } catch (error) {
      
        // Si hay un error, lo pasamos
     
      return done(error, false);
    }
  })
);

export default passport;