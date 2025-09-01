import {describe,it,expect,beforeAll, afterAll} from "vitest"
import request from "supertest"
import {app} from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Profile (e2e)",() => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be to  get user profile", async () => {

        const {token} = await createAndAuthenticateUser(app);
        console.log(token,"tokeneee");
        const profileResponse = await request(app.server).get("/me")
        .set('Authorization',`Bearer ${token}`)
        .send();

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body).toEqual(expect.objectContaining({
            email:'lololo@gmail.com'
        }))
        
    })
})