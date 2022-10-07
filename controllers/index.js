const connect = require("../database");
const jwt = require("jsonwebtoken");
const { createToken, ValidateEmail } = require("../utils");
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
    const dbResponse =
      await connect.query(`SELECT id_product,product_name,product.description,price, category_name , brand_name,sku,product_image ,stock, avaliable FROM product
    INNER JOIN category on product.id_category=category.id_category
    INNER JOIN brand ON product.id_brand=brand.id_brand`);
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
    const dbResponse =
      await connect.query(`select first_name,last_name,birth,gender,rol_name from customer 
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
  const { id_customer } = jwt.decode(token);
  try {
    const dbResponse = await connect.query(
      "SELECT first_name,last_name,birth,gender,email from customer INNER JOIN gender ON gender.id_gender = customer.id_gender WHERE id_customer=$1;",
      [id_customer]
    );
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
  if (!ValidateEmail(email)) {
    return res.status(404).send({
      data: "Por favor ingresa un Correo Electrónico válido",
    });
  }
  try {
    const dbResponse = await connect.query(
      "INSERT INTO customer(first_name, last_name, birth, id_gender, email,password,id_role) VALUES($1,$2,$3,$4,$5,crypt($6,gen_salt('bf')),$7)",
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
  const { first_name, last_name, birth, id_gender, email, password } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  const { id_customer } = jwt.decode(token);

  console.log(jwt.decode(token), id);
  if (!ValidateEmail(email)) {
    return res.status(409).send({
      data: "Por favor ingresa un Correo Electrónico válido",
    });
  } else if (id_customer != id) {
    return res.status(409).send({
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
      [first_name, last_name, birth, id_gender, email, password, id]
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
// Detalle Facturas
const obtenerDetalleFacturas = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      `SELECT id_order,product_name,quantity,unit_product FROM order_detail
    INNER JOIN product ON order_detail.id_product=product.id_product WHERE id_order=$1;`,
      [id]
    );
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
const crearDetalleFacturas = async (req, res) => {
  const { id_order, id_product, quantity, unit_product } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO order_detail(id_order,id_product,quantity,unit_product)values($1,$2,$3,$4);",
      [id_order, id_product, quantity, unit_product]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Detalle de orden creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el detalle de la orden en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
// Facturas
const obtenerFacturas = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      `SELECT id_customer,total,order_status.name AS Status,order_date FROM order_products
      INNER JOIN order_status ON order_status.id_order_status=order_products.id_order_status WHERE id_order=$1`,
      [id]
    );
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
const crearFactura = async (req, res) => {
  const { id_customer, total, id_order_status } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO order_products(id_customer,total,id_order_status)values($1,$2,$3);",
      [id_customer, total, id_order_status]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Factura creada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear la factura en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const modificarFactura = async (req, res) => {
  const { id_order_status } = req.body;
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "UPDATE order_products set id_order_status=$1 WHERE id_order=$2",
      [id_order_status, id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Factura actualizada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo actualizar la factura en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
// Order status
const obtenerStatus = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * from order_status");
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
const crearStatus = async (req, res) => {
  const { name } = req.body;

  try {
    const dbResponse = await connect.query(
      "INSERT INTO order_status(name)values($1);",
      [name]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Status creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el status en este momento",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
const eliminarStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      "Delete FROM order_status WHERE id_order_status=$1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Estatus de la orden eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el estatus de la orden en este momento",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  const { email, passwordbody } = req.body;
  console.log(ValidateEmail(email));
  if (!ValidateEmail(email)) {
    res.status(409).send({
      data: "Por favor ingresa un Correo Electrónico válido",
    });
  }
  try {
    const dbResponse = await connect.query(
      "SELECT id_customer,first_name,rol_name FROM customer INNER JOIN rol ON rol.id_role = customer.id_role WHERE email=$1 AND password = crypt($2,password)",
      [email, passwordbody]
    );
    if (dbResponse.rowCount > 0) {
      const data = {
        id_customer: dbResponse.rows[0].id_customer,
        email: dbResponse.rows[0].email,
        rol: dbResponse.rows[0].rol_name,
      };
      const token = createToken(data);
      res.status(200).send({
        token: token,
      });
    } else {
      res.status(404).send({
        data: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {}
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
  obtenerDetalleFacturas,
  crearDetalleFacturas,
  obtenerFacturas,
  crearFactura,
  modificarFactura,
  obtenerStatus,
  crearStatus,
  eliminarStatus,
  loginController,
};
