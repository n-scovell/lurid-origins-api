import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);
export default app;