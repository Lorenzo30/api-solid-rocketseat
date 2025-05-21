import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-checkin-history";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { title } from "process";



let gymRepository: InMemoryGymRepository;
let sut: SearchGymsUseCase;

describe("search gym use case", () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository();
        sut = new SearchGymsUseCase(gymRepository)
    })

    it("should be able search gym", async () => {

        await gymRepository.create({
            title: "Java script gym",
            description: null,
            phone: null,
            latitude: -25,
            longitude: -45
        })

        await gymRepository.create({
            title: "Type script gym",
            description: null,
            phone: null,
            latitude: -25,
            longitude: -45
        })

        const { gyms } = await sut.execute({
            query: "Type",
            page: 1
        })

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Type script gym" })
        ])
    });


    it("should be able to fetch paginated search gym", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                title: `Java script gym ${i}`,
                description: null,
                phone: null,
                latitude: -25,
                longitude: -45
            })
        }

        const { gyms } = await sut.execute({
            query: "Java script",
            page: 2
        })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Java script gym 21" }),
            expect.objectContaining({ title: "Java script gym 22" }),
        ])

    });

});