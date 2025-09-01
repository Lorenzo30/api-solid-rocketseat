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
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics (request:FastifyRequest,reply:FastifyReply) {

    try {
        const getUserMetricsUseCase = makeGetUserMetricsUseCase();
        const {checkInsCount} = await getUserMetricsUseCase.execute({
            userId:request.user.sub
        });

        reply.status(200).send({
            checkInsCount
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}