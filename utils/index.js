const jwt = require("jsonwebtoken");

const createToken = (data) => {
  const token = jwt.sign(data, "secret", { expiresIn: "1h" });
  return token;
};
function ValidateEmail(input) {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }

}
module.exports={
    createToken,
    ValidateEmail
}
