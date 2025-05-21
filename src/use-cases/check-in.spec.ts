import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./error/max-distance-error";
import { MaxNumberOfCheckInsError } from "./error/max-number-of-check-in-error";



let checkInRepository: CheckInMemoryRepository;
let gymRepository:InMemoryGymRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
    beforeEach( async () => {
        checkInRepository = new CheckInMemoryRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInUseCase(checkInRepository,gymRepository);

        vi.useFakeTimers();

        await gymRepository.items.push({
            id:"1",
            title:"Academia java script",
            description:"",
            latitude:new Decimal(0),
            longitude:new Decimal(0),
            phone:""
        })
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it("should be able to check in", async () => {
        
        vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: "1",
            userId: "1",
            latitude:0,
            longitude:0
        })


        expect(checkIn.id).toEqual(expect.any(String))
    });

    it("should not be able to checkin twice in the same day", async () => {

        vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: "1",
            userId: "1",
            latitude:0,
            longitude:0
        })

        await expect(() => sut.execute({
            gymId: "1",
            userId: "1",
            longitude:0,
            latitude:0
        })).rejects.instanceOf(MaxNumberOfCheckInsError)

    });

    it("should be able to twice checkin in differents days", async () => {

        vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: "1",
            userId: "1",
            longitude:0,
            latitude:0
        })


        vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: "1",
            userId: "1",
            latitude:0,
            longitude:0
        })

        expect(checkIn.id).toEqual(expect.any(String))

    });


    it("should not be able to check in on distant gym", async () => {

        await gymRepository.items.push({
            id:"2",
            title:"Academia java script",
            description:"",
            latitude:new Decimal(0),
            longitude:new Decimal(0),
            phone:""
        })

    
        await expect(async () => {
           await sut.execute({
                gymId: "2",
                userId: "3333",
                latitude:3536536,
                longitude:252626
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)

    });
});