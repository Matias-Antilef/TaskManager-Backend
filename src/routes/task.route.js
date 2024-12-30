// routes/taskRoutes.js
import express from "express";
import {
  createTask,
  deleteTask,
  getTaskFiltered,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";
import {
  validateDescription,
  validateId,
  validateTitle,
  validateQueryStatus,
  validateStatus,
} from "../middleware/taskValidation.js";

const router = express.Router();

//post
router.post("/tasks", validateDescription, validateTitle, createTask);

//get
router.get("/tasks", validateQueryStatus, getTasks);
router.get("/tasks/:id", validateId, getTaskFiltered);

//put
router.put(
  "/tasks/:id",
  validateId,
  validateStatus,
  validateTitle,
  validateDescription,
  updateTask
);

//delete
router.delete("/tasks/:id", validateId, deleteTask);

export default router;
