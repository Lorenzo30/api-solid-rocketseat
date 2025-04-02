import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./error/resource-not-found-error";



let usersRepository:InMemoryUsersRepoitory;
let sut:GetUserProfileUseCase;

describe("Get user profile use case",() => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepoitory();
        sut = new GetUserProfileUseCase(usersRepository);
    })

    it("should be able to get user by id",async () => {
        const createdUser = await usersRepository.create({
            name:"lorenzo",
            email:"lorenzocorrea.ge@gmail.com",
            password_hash:await hash("1234546",6)
        })

        const {user} = await sut.execute({userId:createdUser.id})

        expect(user.id).toEqual(expect.any(String))
    });

    it("should not be able to get user by wrong id",async () => {
        expect( async ()  => {
            await sut.execute({userId:"no-exists"})
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});