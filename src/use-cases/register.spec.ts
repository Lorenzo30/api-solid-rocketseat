import { expect, test, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./error/user-already-exists"
import { RegisterUseCase } from "./register";

let usersRepository : InMemoryUsersRepoitory;
let sut : RegisterUseCase;

describe('Register use case', () => {
    
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepoitory();
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {

        const { user } = await sut.execute({
            name: "Lorenzo",
            email: "lorencwocwjcwcw.ge@gmail.com",
            password: "brazuka123"
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {

    

        const { user } = await sut.execute({
            name: "Lorenzo",
            email: "lorencwocwjcwcw.ge@gmail.com",
            password: "brazuka123"
        })

        const isPasswordCorrectHash = await compare("brazuka123", user.password_hash);

        expect(isPasswordCorrectHash).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
    
        const email = "lorencwocwjcwcw.ge@gmail.com"

        await sut.execute({
            name: "Lorenzo",
            email,
            password: "brazuka123"
        })


        expect(async () => {
            await sut.execute({
                name: "Lorenzo",
                email,
                password: "brazuka123"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})


