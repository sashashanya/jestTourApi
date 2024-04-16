import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user";
import { deleteFunction, login, signUp } from "../../data/helpers";

describe("USER SIGNUP AND LOGIN", () => {
  describe("POSITIVE", () => {
    let cookie: [x: string];
    it("login user", async () => {
      // const res = await request.post("/users/signup").send(user).expect(201)
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toEqual(user.email);
      });
      console.log(user, "user==============");
      // const resLogin = await request
      // .post('/users/login')
      // .send({email:user.email,password:user.password})
      // .expect(200)
      cookie = await login(user).then((el) => {
        console.log(el.body, "body+++++++++");
        expect(el.statusCode).toBe(200);
        return el.header["set-cookie"];
      });
      //console.log(resLogin.body, 'resLogin===============')
      //console.log(res.header['content-type'][1], 'header++++')

      await deleteFunction(cookie).then((el) => {
        console.log(el.body, "el");
        expect(el.statusCode).toBe(204);
      });
      await login(user).then((el) => {
        console.log(el.body, "body=======");
        expect(el.statusCode).toBe(401);
      });
    });
  });
  describe.only("NEGATIVE", () => {
    let cookie: [x: string];
    beforeEach(async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.data.user.email).toEqual(user.email);
        expect(res.body.data.user.name).toEqual(user.name);
        expect(res.body.data.user.role).toEqual("user");
        expect(res.body.token).toBeDefined();
        cookie = res.header["set-cookie"];
      });
    });
    afterEach(async () => {
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
        expect(el.body).toEqual({});
      });
    });
    it("user cannot login with invalid credentials", async () => {
      await login({
        email: user.email + "1",
        password: user.password + "1",
      }).then((el) => {
        console.log(el.body, "=======el=======");
        expect(el.statusCode).toBe(401);
      });
    });
  });
});
