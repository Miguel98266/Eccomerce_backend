const jwt = require("jsonwebtoken");

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

module.exports={
    verifyTokenAdmin
}