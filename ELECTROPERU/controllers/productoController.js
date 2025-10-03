//Acceso a la BD mysql/promise
const db = require('../config/db')

//Metodo exportados
//req require (solicitud)
//res response ( respuesta) 

//Crear
exports.crearProducto = async (req, res) => {
//1. Recepcionar los datos
const {descripcion, garantia, precio} = req.body

//2Validacion backend
if (!descripcion || garantia == undefined || !precio){
  return res.status(400).json({mensaje: 'Falta completar los campos'})
}

//3. Estructura la consulta ... ? = comodin (tiene un indice, similar a un array)
const sql = "INSERT INTO productos (descripcion, garantia, precio) VALUES (?,?,?)"

//4. Transaccion
try{
  //5. Ejecutamos la consulta
  const[result] = await db.query(sql, [descripcion, garantia, precio])

  //6. Entregar un resultado (pk)
  res.status(201).json({
    id: result.insertId,
    mensaje: 'Registro correctamente'
  })

}catch(e){
  console.error(e)
  res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}


//Listar
exports.obtenerProductos = async (req, res) => {
  //1.Preparar Consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM productos"
  //2Transaccion
  try{
    //3. Deserializacion - PRIMER VALOR DE ARREGLO
    const [productos] = await db.query(sql)
    //4. Enviamos los resultados
    res.status(200).json(productos)
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}


//Buscar por ID
//Listar
exports.obtenerProductoPorId = async (req, res) => {
  //.params => http:miweb.com/api/modulo/7
  const { id } = req.params

  //1.Preparar Consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM productos WHERE id = ?"

  //2Transaccion
  try{
    //3. Deserializacion - PRIMER VALOR DE ARREGLO
    const [productos] = await db.query(sql, [id])

    //No encontramos el producto con el ID enviado
    if (productos.length == 0){
      //Cuando se ejecuta "return" se FINALIZA el metodo
      return res.status(404).json({mensaje: 'No encontramos el producto'})
    }
    //4. Enviamos los resultados
    res.status(200).json(productos)
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

//Actualizar
exports.actualizarProducto = async (req, res) => {
  //Necesitamos parametro
  const {id} = req.params

  //Leer un JSON body
  const { descripcion, garantia, precio } = req.body

  //Validacion 
  if (!descripcion && garantia == undefined && !precio){
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  } 

  //Algoritmo eficiente de actualizacion
  //NO SE HARA => UPDATE productos SET descripcion =?, garantia = precio? 
  //SE DESARROLLARA => UPDATE productos SET precio = ?, WHERE id = ?
  let sqlParts = [] //Campos que sufiriran actualizacion
  let values = [] //Valores para los campos

  if (descripcion){
    sqlParts.push('descripcion = ?')
    values.push(descripcion)

  }
  if (garantia != undefined){
    sqlParts.push('garantia = ?')
    values.push(descripcion)
  }

  if (precio) {
    sqlParts.push('precio = ?')
    values.push(precio)
  }

  if (sqlParts.length == 0){
    return res.status(400).json({mensaje: 'no hay datos por actualizar'})
  }

  //Construir de manera dianmica la consulta 
  const sql = `UPDATE productos SET ${sqlParts.join(", ")} WHERE id=?`;
  values.push(id);

  try{
    const [result] = await db.query(sql, values);

    if(result.affectedRows === 0){
      return res.status(404).json({mensaje: 'No encontramos el producto con el ID'})
    }
        res.status(200).json({mensaje: 'Actualizado correctamente'})

    }
    catch(e){
      console.error(e)
      res.status(500).json({mensaje: 'Error interno en el servidor avanzado'})
    }
  }

//Eliminar

exports.eliminarProducto() = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM productos WHERE id =?" //CUIDADO DELETE ES IRREVERSIBLEE

  try{
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0){
      return res.status(404).json({mensaje: 'Producto no encontrado para eliminar'})

  }
    res.status
     
    
  }
}