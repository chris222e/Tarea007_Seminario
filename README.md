📘 Proyecto: Biblioteca
📄 1. Descripción

Aplicación CRUD desarrollada con Node.js + Express + MySQL, que permite gestionar el registro de libros en una biblioteca.

🗄️ 2. Base de Datos

Script SQL: biblioteca.sql

CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE libros(
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(50) NOT NULL,
  autor VARCHAR(50) NOT NULL,
  numpaginas INT NOT NULL,
  categorias VARCHAR(50) NOT NULL
);

🌐 3. Rutas del API

GET /api/libros → listar todos los libros

POST /api/libros → crear un nuevo libro

GET /api/libros/:id → obtener libro por id

PUT /api/libros/:id → actualizar un libro

DELETE /api/libros/:id → eliminar un libro

⚙️ 4. Instalación y Uso

Clonar el proyecto o descargar la carpeta.

Instalar dependencias:

npm install


Configurar credenciales de MySQL en el archivo .env.

Iniciar servidor:

npm start


Probar las rutas en navegador o Postman en:

http://localhost:3000/api/libros
