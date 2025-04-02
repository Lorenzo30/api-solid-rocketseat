import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/error/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate (request:FastifyRequest,reply:FastifyReply) {
    const registerBodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })

    const {email,password} = registerBodySchema.parse(request.body);

    try {
        const registerUser = makeAuthenticateUseCase();
        await registerUser.execute({email,password});
    } catch (e) {
        if (e instanceof InvalidCredentialsError) {
            return reply.status(400).send({message:e.message})
        }

        throw e;
       
    }

    return reply.status(200).send();
}