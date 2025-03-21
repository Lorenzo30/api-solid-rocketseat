import { expect, test, describe, it } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./error/user-already-exists"


describe('Register use case', () => {

    it('should be able to register', async () => {

        const usersRepository = new InMemoryUsersRepoitory();
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: "Lorenzo",
            email: "lorencwocwjcwcw.ge@gmail.com",
            password: "brazuka123"
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {

        const usersRepository = new InMemoryUsersRepoitory();
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: "Lorenzo",
            email: "lorencwocwjcwcw.ge@gmail.com",
            password: "brazuka123"
        })

        const isPasswordCorrectHash = await compare("brazuka123", user.password_hash);

        expect(isPasswordCorrectHash).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepoitory();
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = "lorencwocwjcwcw.ge@gmail.com"

        await registerUseCase.execute({
            name: "Lorenzo",
            email,
            password: "brazuka123"
        })


        expect(async () => {
            await registerUseCase.execute({
                name: "Lorenzo",
                email,
                password: "brazuka123"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})


