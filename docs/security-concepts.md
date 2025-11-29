
# Security concepts: Rate limit, CORS y JWT.

## 1- Rate limit: Es una practica que sirve para dar una cantidad limitada de peticiones o intentos que alguien como cliente puede hacer a un servidor en un corto periodo de tiempo.

** Sirve para: **

-Evitar que un cliente o bot realice muchas solicitudes y sature la API haciendola fallar.
-Aumenta la seguridad.
-Mejora el rendimiento.
 
 ** Ejemplo **
 En un login, normalmente se dan algunos intentos para ingresar correctamente, de lo contrario se te bloquean temporalmente los intentos de acceso para evitar errores o ataques.

 ## 2- CORS: (Cross-Origin Resource Sharing) sirve para controlar que sitios pueden hacer peticiones a la API desde un dominio diferente. Comunmente por seguridad se bloquean las peticiones de otros dominios.

** Que resuelve: **

Permite que las APIS acepten solicitudes de aplicaciones que estan en otro sitio.

** Ejemplo **
La correcta configuracion de CORS permite que el frontend 'http://localhost:5173' llame la API 'http://localhost:3000'.

## 3- JWT: (JSON Web Token) es un token que ayuda a autentificar usuarios sin guardar sesiones innecesarias. Es un texto largo que codifica la informacion del usuario.

** Que lleva dentro? **

Tiene tres partes normalmente:

-Un header, es la parte que dice que tipo de token es y que algoritmo se usó para su firma, permite saber al servidor como validarlo.
-Payload, la parte donde van los datos del usuario o la informacion que se desea transportar (id, correo,rol) y es lo que lo identificara en el servidor.
-Signature, firma digital que asegura que el token no esta alterado, si se cambia algo del contenido la firma deja de ser valida y el servidor la rechaza.


** Se usa para: **

-Permitir autentificar usuarios sin guardar sesion.
-Protege rutas privadas.
-Para que el backend verifique de forma rapida la autorizacion del usuario.

** Ejemplo **
Cuando un usuario inicia sesión el JWT entrega un token, siempre que acceda a una ruta privada debe enviar el token para probar autentificacion. Se verifica si es valido y en base a esto permite o no acceso.

## Conclusion
Los tres conceptos forman actualmente parte de la base de seguridad de APIS moderna y son esenciales para prevenir ataques y mantener un flujo seguro entre cliente-servidor.