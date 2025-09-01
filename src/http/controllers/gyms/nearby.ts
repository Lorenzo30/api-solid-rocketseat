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
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gym-use-case";

export async function nearby (request:FastifyRequest,reply:FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude:z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude:z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const {latitude,longitude} = nearbyGymsQuerySchema.parse(request.query);
    
    try {
        const nearbyUseCase = makeFetchNearbyGymsUseCase();
        const {gyms} = await nearbyUseCase.execute({
           UserLatitude:latitude,
           UserLongitude:longitude
        });

        reply.status(200).send({
            gyms
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}