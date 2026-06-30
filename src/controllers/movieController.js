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
    try {
      const parsed = movieSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      const movie = await movieService.create(parsed.data);
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const movie = await movieService.update(req.params.id, req.body);
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
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