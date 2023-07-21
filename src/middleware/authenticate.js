import { response } from "../api-utility/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authtoken;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err)
        return response({
          res,
          er: true,
          message: "invalid token",
        });
      req.user = user;
      next();
    });
  } else
    return response({
      res,
      er: true,
      message: "missing parameter authToken",
    });
};
export default { authenticate };
