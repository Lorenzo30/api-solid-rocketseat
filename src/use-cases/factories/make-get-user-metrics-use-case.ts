import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkin-repository";

export function makeGetUserMetricsUseCase () {
    const checkInsRepository = new PrismaCheckInRepository();
    const useCase = new GetUserMetricsUseCase(checkInsRepository);

    return useCase
    
}