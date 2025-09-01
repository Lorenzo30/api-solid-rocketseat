import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";

export async function verifyJwt(
    request:FastifyRequest,
    replay:FastifyReply
){
  try {
    await request.jwtVerify()
  } catch (e) {
    return replay.status(401).send({message:"Unautorized"})
  }
 
}