# Instrucciones para BBDD

## En PG, crear BBDD y tabla:

```
CREATE DATABASE skatepark;

CREATE TABLE skaters (
    id SERIAL, email VARCHAR(50) NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(25) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL
);
```

### Requerimientos:

 - Crear una API REST con el Framework Express.
 - Servir contenido dinámico con express-handlebars.
 - Ofrecer la funcionalidad Upload File con express-fileupload.
 - Implementar seguridad y restricción de recursos o contenido con JWT.
 - Aplicar testing E2E, con Cypress una vez que se haya finalizado la construcción de la aplicación, el mismo debe contener al menos 3 pruebas.
 - Realizar la configuración necesaria del proyecto para ser desplegado en Heroku.