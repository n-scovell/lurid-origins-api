import cors from "cors";
export const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "https://luridorigins.vercel.app",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});