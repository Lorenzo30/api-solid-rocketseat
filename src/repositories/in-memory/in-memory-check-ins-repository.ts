import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";

export class CheckInMemoryRepository implements CheckInsRepository {

    public items: CheckIn[] = []

    async create(data:Prisma.CheckInUncheckedCreateInput){
        const checkIn = {
            id:randomUUID(),
            user_id:data.user_id,
            gym_id:data.gym_id,
            created_at:new Date(),
            validated_at:data.validated_at ? new Date(data.validated_at) : null
        }

        this.items.push(checkIn);

        return checkIn
    }
}