import { createError } from "./error.js";

export const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(createError({ status: 403, message: "Forbidden: Admin access required" }));
  }
  next();
};
