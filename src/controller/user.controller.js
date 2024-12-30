import { validationResult } from "express-validator";
import User from "../model/UserModel.js";

const userRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, password });
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = user.generateAuthToken();

    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error); // Esto imprimirá el error en la consola del servidor
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export { userRegister, userLogin };
