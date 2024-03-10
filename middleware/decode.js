const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.Authorization || req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SERVER, (err, decode) => {
      if (err) {
        throw new Error("can't Verify");
      }
      //   console.log(decode);
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("user is not authorized or token is missing");
    }
  }
});
module.exports = validateToken;
