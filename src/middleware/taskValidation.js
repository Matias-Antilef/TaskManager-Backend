import mongoose from "mongoose";
import { param, body, query } from "express-validator";

const validateId = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid ID format"),
];

const validateTitle = [
  body("title").notEmpty().withMessage("Title is required"),
];

const validateDescription = [
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 100 })
    .withMessage("Description must be at most 100 characters long"),
];

const validateStatus = [
  body("completed")
    .optional()
    .isString()
    .withMessage("Completed must be a string"),
];

const validateQueryStatus = [
  query("completed")
    .optional()
    .isString()
    .withMessage("Completed must be a string"),
];

export {
  validateId,
  validateTitle,
  validateDescription,
  validateStatus,
  validateQueryStatus,
};
