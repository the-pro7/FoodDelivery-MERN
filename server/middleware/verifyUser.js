import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
      if (err) return next(createError(301, "Could ot verify token"))

      req.user = decoded
    });
    return next();
  } catch (err) {
    next(err);
  }
};
