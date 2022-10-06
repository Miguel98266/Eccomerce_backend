const { Router } = require("express");
const router = Router();
const {verifyTokenAdmin}=require("../middleware");
const {
  crearMarca,
  obtenerMarcas,
  modificarMarca,
  obtenerCategorias,
  crearCategoria,
  modificarCategoria,
  obtenerTodosProductos,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  obtenerUsuarios,
  obtenerUsuarioActual,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  obtenerFacturas,
  crearFactura,
  modificarFactura,
  obtenerDetalleFacturas,
  crearDetalleFacturas,
  obtenerStatus,
  crearStatus,
  eliminarStatus,
  loginController,
} = require("../controllers");

// Marca
router.get("/api/v1/brand", obtenerMarcas);
router.post("/api/v1/brand",verifyTokenAdmin, crearMarca);
router.put("/api/v1/brand/:id",verifyTokenAdmin, modificarMarca);

// Categoria
router.get("/api/v1/category", obtenerCategorias);
router.post("/api/v1/category", verifyTokenAdmin,crearCategoria);
router.put("/api/v1/category/:id", verifyTokenAdmin,modificarCategoria);

// Productos
router.get("/api/v1/products", obtenerTodosProductos);
router.post("/api/v1/products", verifyTokenAdmin, crearProducto);
router.put("/api/v1/products/:id", verifyTokenAdmin, modificarProducto);
// router.delete("/api/v1/products/:id", eliminarProducto);

// Usuarios
router.get("/api/v1/users", verifyTokenAdmin,obtenerUsuarios);
router.post("/api/v1/users", crearUsuario);
router.get("/api/v1/users/me", obtenerUsuarioActual);
router.patch("/api/v1/users/:id",verifyTokenAdmin, modificarUsuario);
router.delete("/api/v1/users/:id", verifyTokenAdmin,eliminarUsuario);


// Facturas
router.get("/api/v1/invoices/:id",obtenerFacturas);
router.post("/api/v1/invoices", crearFactura);
router.patch("/api/v1/invoices/:id", verifyTokenAdmin,modificarFactura);

// Detalle Facturas
router.get("/api/v1/invoices-details/:id",obtenerDetalleFacturas);
router.post("/api/v1/invoices-details",crearDetalleFacturas);

// Order Status
router.get("/api/v1/order-status", obtenerStatus);
router.post("/api/v1/order-status",verifyTokenAdmin, crearStatus);
router.delete("/api/v1/order-status/:id",verifyTokenAdmin, eliminarStatus);
// Login
router.post("/api/v1/login", loginController);

module.exports = router;