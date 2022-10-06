const jwt = require("jsonwebtoken");
const connect = require("../database");

const verifyTokenAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    // console.log(jwt.decode(token));
    const {rol}=jwt.decode(token);
    console.log(rol);
    if (rol==="Admin") {
        await jwt.verify(token, 'secret');
        next();
    }else{
        res.status(404).send({
            message:"Este usuario no tiene los suficientes permisos para esta ruta"
        });
    }
  } catch (error) {
    res.send({
        message:"Token no suministrado"
    });
  }
};
const validateemailexiste=async(req, res, next)=>{
  const {  email } = req.body;
  try {
    console.log("Intento",email)
    const dbResponseemail = await connect.query("Select * FROM customer WHERE email=$1",[email]);
    if (dbResponseemail.rowCount == 0) {
        next();
        } 
        else{
          res.status(404).send({
            message:"Este correo ya esta registrado intenta con otro"
        });
        }
  } 
  catch(error){
    res.send({
      message:"Error"
  });
  }
}

module.exports={
    verifyTokenAdmin,
    validateemailexiste
}