import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import taskRoutes from "./routes/task.route.js";
import userRoutes from "./routes/user.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger/swaggerOptions.js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo ok");
});

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocs);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

export default app;
