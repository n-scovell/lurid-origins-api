import express from "express";
import { corsMiddleware } from "./_cors.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    name: "Lurid Origins API",
    version: "1.0.0",
  });
});

app.use("/api/movies", movieRoutes);

export default app;