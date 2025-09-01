import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymRepository } from "@/repositories/gyms-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckIn } from "@prisma/client";
import { date } from "zod";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordinates";
import { MaxNumberOfCheckInsError } from "./error/max-number-of-check-in-error";
import { MaxDistanceError } from "./error/max-distance-error";

interface ValidateCheckInRequest {
  checkInId:string
}

interface ValidateCheckInResponse {
  checkIn:CheckIn
}


export class ValidateCheckInUseCase {
    constructor(
      private checkInRepository:CheckInsRepository,
    ){}

    async execute({checkInId}:ValidateCheckInRequest){

      const checkIn = await this.checkInRepository.findById(checkInId)

      if (!checkIn) {
          throw new ResourceNotFoundError();
      }

      checkIn.validated_at = new Date();
      
        return {
            checkIn
        }

    }
}