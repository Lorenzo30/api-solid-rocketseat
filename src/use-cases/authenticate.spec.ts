import { expect, test, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare, hash } from "bcryptjs"
import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./error/user-already-exists"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./error/invalid-credentials-error"


let usersRepository : InMemoryUsersRepoitory;
let sut : AuthenticateUseCase;

describe('Authenticate use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepoitory();
        sut = new AuthenticateUseCase(usersRepository);
    })

    it('should be able to authenticate', async () => {

       
        await usersRepository.create({
            name:"Lorenzo",
            email:"lorenzocorrea.ge@gmail.com",
            password_hash: await hash("123456",6)
        })

        const { user } = await sut.execute({
            email:"lorenzocorrea.ge@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should not be able to authenticate with wrong email" ,async () => {
     

        expect( async () => await sut.execute({
            email:"lorenzocorrea.ge@gmail.co",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should not be able to authenticate with wrong password" ,async () => {
    
        await usersRepository.create({
            name:"Lorenzo",
            email:"lorenzocorrea.ge@gmail.com",
            password_hash: await hash("123456",6)
        })


        expect( async () => await sut.execute({
            email:"lorenzocorrea.ge@gmail.com",
            password: "123455"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})


