import { prisma } from "../prisma.js";

export const movieService = {
  // GET ALL with filters
  getAll: async (filters) => {
    const { watched, era, movie, year, tag, search } = filters;
    return prisma.movie.findMany({
      where: {
        ...(watched !== undefined && {
          watched: watched === "true",
        }),
        ...(era && { era, }),
        ...(movie && {movie: {contains: movie, mode: "insensitive",}, }),
        ...(tag && { tags: { has: tag, }, }),
        // ...(year && { year: Number(year), }),
        ...(year && {year: {contains: year, mode: "insensitive",}, }),
        ...(search && { movie: { contains: search, mode: "insensitive", }, }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getById: async (id) => {
    return prisma.movie.findUnique({
      where: { id: Number(id) },
    });
  },

  // create: async (data) => {
  //   const existing = await prisma.movie.findFirst({
  //     where: {
  //       movie: data.movie,
  //       year: data.year,
  //     },
  //   });
  //   if (existing) {
  //     throw new Error(`${data.movie} from ${data.year} is already made`);
  //   }
  //   return await prisma.movie.create({
  //     data,
  //   });
  // },

  create: async (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Request body:", req.body);
    // if (
    //   !process.env.LO_API_KEY ||
    //   req.body.action !== process.env.LO_API_KEY
    // ) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const { action, ...movieData } = req.body;

    const parsed = movieSchema.safeParse(movieData);

    if (!parsed.success) {
      return res.status(400).json({
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const movie = await movieService.create(parsed.data);
      return res.status(201).json(movie);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create movie" });
    }
  },

  update: async (id, data) => {
    return prisma.movie.update({
      where: { id: Number(id) },
      data,
    });
  },

  remove: async (id) => {
    return prisma.movie.delete({
      where: { id: Number(id) },
    });
  },
};