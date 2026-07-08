import { prisma } from "../prisma.js";

export const movieService = {
  // GET ALL with filters
  getAll: async (filters) => {
    const { watched, era, tag, search } = filters;
    return prisma.movie.findMany({
      where: {
        ...(watched !== undefined && {
          watched: watched === "true",
        }),

        ...(era && {
          era,
        }),

        ...(tag && {
          tags: {
            has: tag,
          },
        }),

        ...(search && {
          movie: {
            contains: search,
            mode: "insensitive",
          },
        }),
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

  create: async (data) => {
    const existing = await prisma.movie.findFirst({
      where: {
        movie: data.movie,
        year: data.year,
      },
    });
    
    if (existing) {
      throw new Error(`${data.movie} from ${data.year} is already made`);
    }
    return await prisma.movie.create({
      data,
    });
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