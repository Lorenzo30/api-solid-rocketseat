import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";

export async function onlyAdmin(
    request: FastifyRequest,
    replay: FastifyReply
) {
    const { role } = request.user

    if (role != "ADMIN") {
        return replay.status(401).send({ message: "Unautorized" })
    }

}
