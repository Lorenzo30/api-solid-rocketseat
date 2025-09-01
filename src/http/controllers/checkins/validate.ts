import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/error/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-gym-use-case";
import { makeCheckInUseCase } from "@/use-cases/factories/makecheck-in-use-case";
import { makeValidatedCheckInUseCase } from "@/use-cases/factories/make-validated-check-use-case";

export async function validate (request:FastifyRequest,reply:FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId:z.string().uuid()
    })

    const {checkInId} = validateCheckInParamsSchema.parse(request.params)

    try {
        const validateCheckInUseCase = makeValidatedCheckInUseCase();
        await validateCheckInUseCase.execute({checkInId});
    } catch (e) {
        throw e;
       
    }

    return reply.status(204).send();
}