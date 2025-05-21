import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

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

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date")
        const endOfDay = dayjs(date).endOf("date")

        const checkInOnSameDate = this.items.find((checkin) => {
            const checkInDate = dayjs(checkin.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfDay)

            return checkin.user_id == userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate
    }


    async findManyByUserId(userId: string,page:number): Promise<CheckIn[]> {
        return this.items.filter((item) => item.user_id == userId).slice((page - 1) * 20,page * 20)
    }

    async countByUserId(userId: string)  {
        return this.items.filter((item) => item.user_id == userId).length
    }

}