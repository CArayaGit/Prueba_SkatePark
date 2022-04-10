DROP TABLE IF EXISTS skaters;

CREATE TABLE skaters (
    id SERIAL, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL DEFAULT FALSE
);

insert into skaters (nombre, email, password, anos_experiencia, especialidad, foto, estado)
values 
('pedro', 'pedro@email.com', '123', 8, 'oly', 'pedro.jpg', false);
('juan', 'juan@email.com', '123', 2, 'flip', 'juan.jpg', false);