import { FetchUserCheckInHistoryUseCase } from "../fetch-user-checkin-history";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkin-repository";

export function makeFetchUsersCheckInHistoryUseCase () {
    const checkInsRepository = new PrismaCheckInRepository();
    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository);

    return useCase
    
}