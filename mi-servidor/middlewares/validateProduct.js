import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("price").isNumeric().withMessage("El precio debe ser numérico"),
  body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un entero positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }
    next();
  }
];
