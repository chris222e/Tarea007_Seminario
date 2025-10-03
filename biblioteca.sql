CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

CREATE TABLE IF NOT EXISTS libros
(	
	id				INT AUTO_INCREMENT PRIMARY KEY,
    titulo  		VARCHAR(50)		NOT NULL,
    autor			VARCHAR(50)		NOT NULL,
    numpaginas		INT   		NOT NULL,
    categorias		VARCHAR(50)		NOT NULL
)ENGINE = INNODB;

INSERT INTO libros (titulo, autor, numpaginas, categorias) VALUES 
('Cien años de soledad', 'Gabriel García Márquez', 471, 'Realismo mágico'),
('El Principito', 'Antoine de Saint-Exupéry', 96, 'Infantil');

SELECT * FROM libros;
