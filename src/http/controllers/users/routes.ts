import { app } from "@/app";
import { register } from "./register";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app:FastifyInstance) {
  app.post("/users",register);
  app.get("/me",{onRequest:[verifyJwt]},profile);

  app.patch("/token/refresh",refresh)
  app.post("/sessions",authenticate)
}