// Acceso a la BD mysql/promise
const db = require('../config/db')

// Métodos exportados

// Crear libro
exports.crearLibro = async (req, res) => {
  const { titulo, autor, numpaginas, categorias } = req.body
  if (!titulo || !autor || !numpaginas || !categorias) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' })
  }
  const sql = "INSERT INTO libros (titulo, autor, numpaginas, categorias) VALUES (?, ?, ?, ?)"
  try {
    const [result] = await db.query(sql, [titulo, autor, numpaginas, categorias])
    const nuevoId = result.insertId
    res.status(201).json({ mensaje: 'Libro creado', id: nuevoId })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error al crear el libro' })
  }
} 

// Listar libros
exports.obtenerLibros = async (req, res) => {
  const sql = "SELECT id, titulo, autor, numpaginas, categorias FROM libros"
  try {
    const [libros] = await db.query(sql)
    res.status(200).json(libros)
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Obtener libro por id
exports.obtenerLibroPorId = async (req, res) => {
  const { id } = req.params
  const sql = "SELECT id, titulo, autor, numpaginas, categorias FROM libros WHERE id = ?"
  try {
    const [rows] = await db.query(sql, [id])
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Libro no encontrado' })
    res.status(200).json(rows[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Actualizar libro
exports.actualizarLibro = async (req, res) => {
  const { id } = req.params
  const { titulo, autor, numpaginas, categorias } = req.body
  const sql = "UPDATE libros SET titulo = ?, autor = ?, numpaginas = ?, categorias = ? WHERE id = ?"
  try {
    const [result] = await db.query(sql, [titulo, autor, numpaginas, categorias, id])
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Libro no encontrado' })
    res.status(200).json({ mensaje: 'Libro actualizado' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error al actualizar el libro' })
  }
}

// Eliminar libro
exports.eliminarLibro = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM libros WHERE id = ?"
  try {
    const [result] = await db.query(sql, [id])
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Libro no encontrado' })
    res.status(200).json({ mensaje: 'Libro eliminado' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error al eliminar el libro' })
  }
}
