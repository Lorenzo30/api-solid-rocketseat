import { FastifyReply,FastifyRequest } from "fastify";
import { makeFetchUsersCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-users-checkins-use-case";

export async function history (request:FastifyRequest,reply:FastifyReply) {
    try {
        const fetchUserCheckInsUseCase = makeFetchUsersCheckInHistoryUseCase();
        const {checkIns} = await fetchUserCheckInsUseCase.execute({
            userId:request.user.sub,
            page:1
        });

        
        reply.status(200).send({
            checkIns
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}