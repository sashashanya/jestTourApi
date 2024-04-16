import * as supertest from "supertest";

const request = supertest("localhost:8001/api/v1");
export async function deleteFunction(cookie:[x:string]): Promise<any>{
  return await request
    .delete("/users/deleteMe")
    .set("Cookie", cookie)
}
export async function login(user: {
  email: string;
  password: string;
}): Promise<any> {
  return await request
    .post("/users/login")
    .send({ email: user.email, password: user.password });
}
export async function signUp(user: string | object | undefined): Promise<any> {
  return await request.post("/users/signup").send(user);
}
