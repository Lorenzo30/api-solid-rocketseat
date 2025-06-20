import { User, Prisma, Gym } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { FindManyNearbyParams, GymRepository } from "../gyms-repository";
import { title } from "process";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordinates";

export class InMemoryGymRepository implements GymRepository {

    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const user = this.items.find((item) => item.id == id)

        if (!user) {
            return null;
        }

        return user;
    }

    async create(data:Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id:data.id ?? randomUUID(),
            title:data.title,
            description:data.description ?? null,
            phone:data.phone ?? null,
            latitude:new Prisma.Decimal(data.latitude.toString()),
            longitude:new Prisma.Decimal(data.longitude.toString())
        }

        this.items.push(gym);

        return gym;
    }

    async searchMany(query: string, page: number) {
        return this.items.filter(item => item.title.includes(query)).slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(params: FindManyNearbyParams) {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                {latitude:params.latitude,longitude:params.longitude},
                {latitude:item.latitude.toNumber(),longitude:item.longitude.toNumber()}
            )

            return distance < 10;
        })
    }

}