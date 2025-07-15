import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";
import { AuthenticateUseCase } from "../authenticate";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase () {
    const UsersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(UsersRepository);

    return useCase
    
}