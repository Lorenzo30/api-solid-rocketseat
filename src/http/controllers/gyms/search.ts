import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/error/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search (request:FastifyRequest,reply:FastifyReply) {
    const searchGymsQuerySchema = z.object({
        q:z.string(),
        page:z.coerce.number().min(1).default(1)
    })

    const {q,page} = searchGymsQuerySchema.parse(request.query);

    try {
        const searchGymsUseCase = makeSearchGymsUseCase();
        const {gyms} = await searchGymsUseCase.execute({
            query:q,
            page
        });

        
        reply.status(200).send({
            gyms
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}