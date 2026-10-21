import { movieService } from "../services/movieService.js";
import { movieSchema } from "../schemas/movieSchema.js"; 

export const movieController = {
  
  getAll: async (req, res) => {
    try {
      const movies = await movieService.getAll(req.query);
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const movie = await movieService.getById(req.params.id);
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    const body = req.body;
    if (!body || typeof body !== "object") {
      return res.status(400).json({
        error: "Missing request body",
      });
    }
    if (!process.env.LO_API_KEY || body.action !== process.env.LO_API_KEY) {
      return res.status(401).json({
         error: "Incorrect password. Please try again.",
      });
    }
    const { action, ...movieData } = body;
    try {
      const parsed = movieSchema.safeParse(movieData);
      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      const movie = await movieService.create(parsed.data);
      return res.status(201).json(movie);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Failed to create movie",
      });
    }
  },

  // update: async (req, res) => {
  //   const body = req.body;
  //   if (!body || typeof body !== "object") {
  //     return res.status(400).json({
  //       error: "Missing request body",
  //     });
  //   }
  //   if (!process.env.LO_API_KEY || body.action !== process.env.LO_API_KEY) {
  //     return res.status(401).json({
  //        error: "Incorrect password. Please try again.",
  //     });
  //   }
  //   const { action, ...movieData } = body;
  //   try {
  //     const movie = await movieService.update(req.params.id, movieData);
  //     res.json(movie);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },


  update: async (req, res) => {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        error: "Missing or invalid request body",
      });
    }
    if (
      !process.env.LO_API_KEY ||
      body.action !== process.env.LO_API_KEY
    ) {
      return res.status(401).json({
        error: "Incorrect password. Please try again.",
      });
    }
    const { action, ...movieData } = body;
    if (Object.keys(movieData).length === 0) {
      return res.status(400).json({
        error: "No movie fields provided for update",
      });
    }
    try {
      const movie = await movieService.update(
        req.params.id,
        movieData
      );
      return res.json(movie);
    } catch (err) {
      console.error("Movie update failed:", err);
      return res.status(500).json({
        error: "Failed to update movie",
      });
    }
  },

  remove: async (req, res) => {
    try {
      await movieService.remove(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};