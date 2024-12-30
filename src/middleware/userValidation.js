import { body } from "express-validator";

const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters long"),
];

export { validateRegister };
