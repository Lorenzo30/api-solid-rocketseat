import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./error/user-already-exists";
import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";


interface CreateGymUseCaseRequest {
  title:string,
  description:string | null,
  phone:string | null,
  latitude:number,
  longitude:number
}

interface CreateGymUseCaseResponse {
    gym:Gym
}


export class CreateGymUseCase {

    constructor(
        private gymRepository:GymRepository
    ) {}

    async execute ({longitude,description,latitude,phone,title}:CreateGymUseCaseRequest) : Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymRepository.create({description,latitude,longitude,phone,title})
        return {gym}
    }
}

