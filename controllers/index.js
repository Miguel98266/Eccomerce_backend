const connect = require("../database");
const jwt = require("jsonwebtoken");
const {createToken,ValidateEmail} = require("../utils");
// req --> Recibe los datos de la peticion
// res --> Responde al cliente
// req,params --> Recibimos datos que llegan por la URL pero son obligatorios
// req.query --> Recibimos datos que llegan por la URL pero son opcionales
// req.body --> Recibimos los datos que llegan en el body con POST , PUT, PATCH o DELETE

// PUT escriba otra vez todos los datos
// PATCH actualiza solo un dato

// Marca
const obtenerMarcas = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM brand");
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const crearMarca = async (req, res) => {
  const { brand_name } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO brand(brand_name) VALUES($1)",
      [brand_name]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Marca creada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear la marca en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const modificarMarca = async (req, res) => {
  const { brand_name } = req.body;
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "UPDATE brand set brand_name=$1 WHERE id_brand=$2",
      [brand_name, id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Marca actualizada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo actualizar la marca en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
// Categoria
const obtenerCategorias = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM category");
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const crearCategoria = async (req, res) => {
  const { category_name, description } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO category(category_name,description) VALUES($1,$2)",
      [category_name, description]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Categoria creada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear la categoria en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const modificarCategoria = async (req, res) => {
  const { category_name, description } = req.body;
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "UPDATE category set category_name=$1 , description=$2 WHERE id_category=$3",
      [category_name, description, id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Categoria actualizada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo actualizar la categoria en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
// Productos
const obtenerTodosProductos = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM product");
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const crearProducto = async (req, res) => {
  const {
    product_name,
    description,
    price,
    id_category,
    id_brand,
    sku,
    product_image,
    stock,
    avaliable,
  } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO product(product_name, description, price, id_category, id_brand,sku,product_image,stock,avaliable) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        product_name,
        description,
        price,
        id_category,
        id_brand,
        sku,
        product_image,
        stock,
        avaliable,
      ]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Producto creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el producto en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const modificarProducto = async (req, res) => {
  const {
    product_name,
    description,
    price,
    id_category,
    id_brand,
    sku,
    product_image,
    stock,
    avaliable,
  } = req.body;
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      `UPDATE product set 
        product_name=$1, 
        description=$2,
        price=$3,
        id_category=$4,
        id_brand=$5,
        sku=$6,
        product_image=$7,
        stock=$8,
        avaliable=$9
        WHERE id_product=$10`,
      [
        product_name,
        description,
        price,
        id_category,
        id_brand,
        sku,
        product_image,
        stock,
        avaliable,
        id,
      ]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Producto actualizado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo actualizar el producto en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "Delete FROM product WHERE id_product=$1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Producto eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el producto en este momento",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};
// Usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const dbResponse = await connect.query(`select first_name,last_name,birth,gender,rol_name from customer 
    INNER JOIN gender ON gender.id_gender = customer.id_gender
    INNER JOIN rol on rol.id_role = customer.id_role;`);
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const obtenerUsuarioActual = async (req, res) => {
  const token = req.headers.authorization;
  const {id}=jwt.decode(token);
  try {
    const dbResponse = await connect.query("SELECT first_name,last_name,birth,gender from customer INNER JOIN gender ON gender.id_gender = customer.id_gender WHERE id_customer=$1;",[id]);
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const crearUsuario = async (req, res) => {
  const { first_name, last_name, birth, id_gender, email, password, id_role } =
    req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO customer(first_name, last_name, birth, id_gender, email,password,id_role) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [first_name, last_name, birth, id_gender, email, password, id_role]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Usuario creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el usuario en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const modificarUsuario = async (req, res) => {
  const { first_name, last_name, birth, id_gender, email, password} =req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  const {id_customer}=jwt.decode(token);
  console.log(jwt.decode(token))
  if(!ValidateEmail(email)){
    return res.status(404).send({
      data: "Por favor ingresa un Correo Electrónico válido",
    });
  }else if(id_customer!==id){
    return res.status(404).send({
      data: "El usuario no contiene suficientes permisos",
    });
  }
  try {
    const dbResponse = await connect.query(
      `UPDATE customer set 
          first_name=$1, 
          last_name=$2,
          birth=$3,
          id_gender=$4,
          email=$5,
          password=crypt($6,gen_salt('bf'))
          WHERE id_customer=$7`,
      [first_name, last_name, birth, id_gender,email, password, id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Usuario actualizado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo actualizar el usuario en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "Delete FROM customer WHERE id_customer=$1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Usuario eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el usuario en este momento",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};
// Facturas
const obtenerFacturas = async (req, res) => {
    const { id } = req.params;
    try {
      const dbResponse = await connect.query("SELECT * FROM order_products WHERE id_order=$1",[id]);
      console.log(dbResponse.rows);
      res.status(200).send({
        data: dbResponse.rows,
      });
    } catch (error) {
      res.status(404).send({
        error,
      });
    }
};
// Login
const loginController=async(req,res)=>{
  const{email,passwordbody}= req.body;
  console.log(ValidateEmail(email))
  if(!ValidateEmail(email)){
    res.status(404).send({
      data: "Por favor ingresa un Correo Electrónico válido",
    });
  }
  try {
    const dbResponse = await connect.query(
      "SELECT id_customer,first_name,rol_name FROM customer INNER JOIN rol ON rol.id_role = customer.id_role WHERE email=$1 AND password = crypt($2,password)",
      [email,passwordbody]
    );
    if (dbResponse.rowCount > 0) {
      const data={
        id_customer:dbResponse.rows[0].id_customer,
        email:dbResponse.rows[0].email,
        rol:dbResponse.rows[0].rol_name,
      }
      const token=createToken(data)
      res.status(200).send({
        token: token,
      });
    } else {
      res.status(404).send({
        data: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
        
  }
};

module.exports = {
  crearMarca,
  obtenerMarcas,
  modificarMarca,
  obtenerCategorias,
  crearCategoria,
  modificarCategoria,
  crearProducto,
  obtenerTodosProductos,
  modificarProducto,
  eliminarProducto,
  obtenerUsuarios,
  obtenerUsuarioActual,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  obtenerFacturas,
  loginController
};
