import mongoose from "mongoose";
import app from "./app.js";
import { MONGO_URI, SERVER_PORT } from "./config/config.js";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Ocurred an error connecting to MongoDB", err));

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
  console.log(
    `Swagger UI is running on port http://localhost:${SERVER_PORT}/api-docs`
  );
});
