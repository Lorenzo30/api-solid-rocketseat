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
import { makeFetchUsersCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-users-checkins-use-case";

export async function history (request:FastifyRequest,reply:FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page:z.coerce.number().min(1).default(1)
    })

    const {page} = checkInHistoryQuerySchema.parse(request.body);

    try {
        const fetchUserCheckInsUseCase = makeFetchUsersCheckInHistoryUseCase();
        const {checkIns} = await fetchUserCheckInsUseCase.execute({
            userId:request.user.sub,
            page
        });

        
        reply.status(200).send({
            checkIns
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}