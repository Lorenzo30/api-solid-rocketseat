import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/error/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-gym-use-case";

export async function create (request:FastifyRequest,reply:FastifyReply) {
    const createGymBodySchema = z.object({
        title:z.string(),
        description:z.string().nullable(),
        phone:z.string().nullable(),
        latitude:z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude:z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const {title,description,phone,latitude,longitude} = createGymBodySchema.parse(request.body);

    try {
        const createGym = makeCreateGymUseCase();
        await createGym.execute({description,latitude,phone,longitude,title});
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}