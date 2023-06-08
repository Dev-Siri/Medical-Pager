import { config as configureEnv } from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";

import authRoutes from "./routes/auth.js";

configureEnv();

const fastify = Fastify();
const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === "development" ? "localhost" : "0.0.0.0";

await Promise.all([
  fastify.register(cors, {
    origin: process.env.ORIGIN,
    methods: ["POST"],
  }),
  fastify.register(authRoutes),
]);

fastify.listen({ port: PORT, host: HOST }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server running on: ${address}`);
});
