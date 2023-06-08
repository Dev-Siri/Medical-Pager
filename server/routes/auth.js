import { signup, login } from "../controllers/auth.js";

export default async function authRoutes(fastify) {
  fastify.post("/auth/signup", signup);
  fastify.post("/auth/login", login);
}
