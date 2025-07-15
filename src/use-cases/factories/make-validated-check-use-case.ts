import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ValidateCheckInUseCase } from "../validate-checkin";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkin-repository";

export function makeValidatedCheckInUseCase () {
    const UsersRepository = new PrismaCheckInRepository();
    const useCase = new ValidateCheckInUseCase(UsersRepository);

    return useCase
    
}