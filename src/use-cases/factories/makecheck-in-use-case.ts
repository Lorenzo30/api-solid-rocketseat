import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkin-repository";

export function makeCheckInUseCase () {
    const checkInsRepository = new PrismaCheckInRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckInUseCase(checkInsRepository,gymsRepository);

    return useCase
    
}