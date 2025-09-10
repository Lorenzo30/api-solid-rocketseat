import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/error/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function refresh (request:FastifyRequest,reply:FastifyReply) {
      
    await request.jwtVerify({onlyCookie:true})
     
    try {
        

        const {role} = request.user

        const token = await reply.jwtSign({
            role
        },{
            sign:{
                sub:request.user.sub,
                expiresIn:"10m"
            }
        })

        const refreshToken = await reply.jwtSign(
            {
                role
        },{
            sign:{
                sub:request.user.sub,
                expiresIn:"7d"
            }
        })

        return reply.setCookie('refreshToken',refreshToken,{
            path:"/",
            secure:true,
            sameSite:true,
            httpOnly:true
        })  
        .status(200).send({
            token
        });
    } catch (e) {
        if (e instanceof InvalidCredentialsError) {
            return reply.status(400).send({message:e.message})
        }

        throw e;
       
    }

    
}