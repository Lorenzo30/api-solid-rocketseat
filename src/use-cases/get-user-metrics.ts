import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";


interface GetUserMetricsRequest {
  userId:string
}

interface  GetUserMetricsResponse {
  checkInsCount:number
}


export class  GetUserMetricsUseCase {
    constructor(
      private checkInRepository:CheckInsRepository,
    ){}

    async execute({userId}:GetUserMetricsRequest) : Promise<GetUserMetricsResponse>{
        const checkInsCount = await this.checkInRepository.countByUserId(userId)
        return {
            checkInsCount
        }

    }
}