import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";


interface FetchUserCheckInHistoryRequest {
  userId:string,
  page:number
}

interface  FetchUserCheckInHistoryResponse {
  checkIns:CheckIn[]
}


export class  FetchUserCheckInHistoryUseCase {
    constructor(
      private checkInRepository:CheckInsRepository,
    ){}

    async execute({userId,page}:FetchUserCheckInHistoryRequest) : Promise<FetchUserCheckInHistoryResponse>{
        const checkIns = await this.checkInRepository.findManyByUserId(userId,page)
        return {
          checkIns
        }

    }
}