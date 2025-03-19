import fastify from "fastify";
import {z, ZodError} from "zod"
import { PrismaClient } from "@prisma/client";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";

const prisma = new PrismaClient();

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error,_,reply) => {
   if (error instanceof ZodError) {
        return reply.status(400)
        .send({message:"validation error",issues:error.format()})
   }
   
   if (env.NODE_ENV != "production") {
      console.error(error);
   }
    
   return reply.status(500).send({message:"Internal server error"})
})
