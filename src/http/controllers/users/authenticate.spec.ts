import {describe,it,expect,beforeAll, afterAll} from "vitest"
import request from "supertest"
import {app} from "@/app"

describe("Authenticate (e2e)",() => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be able to authenticate", async () => {

         const r = await request(app.server).post("/users").send({
            name:"Lorenzo",
            email:"loaaaaal@gmail.com",
            password:"123456"
        })

    
        const response = await request(app.server).post("/sessions").send({
            email:"loaaaaal@gmail.com",
            password:"123456"
        })

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token:expect.any(String)
        })
    })
})