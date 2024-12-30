import { validationResult } from "express-validator";
import Task from "../model/TaskModel.js";

const createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;

  try {
    const task = new Task({ title, description });
    await task.save();
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { completed } = req.query;

  try {
    if (completed === "true") {
      const tasks = await Task.find({ completed: true });
      return res.status(200).json(tasks);
    }

    if (completed === "false") {
      const tasks = await Task.find({ completed: false });
      return res.status(200).json(tasks);
    }
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

const getTaskFiltered = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findById({ _id: id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

const updateTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, completed } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task dont exists" });
    }

    return res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task dont exists" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export { createTask, getTasks, getTaskFiltered, updateTask, deleteTask };
