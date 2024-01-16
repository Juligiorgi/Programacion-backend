import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/mongo/models/users.model.js";

const requester = supertest(app);

describe("ecommerce test", function () {
  describe("sessions router test", function () {
    const mockUser = {
      firstName: "julieta",
      lastName: "giorgi",
      age: 22,
      email: "juligiorgi2536@gmail.com",
      password: "juli123456",
    };

    before(async function () {
      this.cookie;
      await usersModel.deleteMany({});
    });

    //signup
    it("/api/sessions/signup endpoint must register a user correctly", async function () {
      const user = mockUser;
      const response = await requester.post("/api/sessions/signup").send(user);
      expect(response.status).to.be.equal(200);
      expect(response.res.text).to.include("user created successfully");
    });

    //fails signup
    it("/api/sessions/fail-signup endpoint must redirect to signup", async function () {
      const response = await requester.get("/api/sessions/fail-signup");
      expect(response.res.text).to.include("Sign up error");
    });

    //login
    it("/api/sessions/login endpoint must login the user correctly", async function () {
      const user = {
        email: mockUser.email,
        password: mockUser.password,
      };
      const response = await requester.post("/api/sessions/login").send(user);
      expect(response.body.message).to.be.equal("login successfully");

      const cookieResult = response.header["set-cookie"][0];
      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");
    });

    //fails login
    it("/api/sessions/fail-login endpoint must redirect to login", async function () {
      const response = await requester.get("/api/sessions/fail-login");
      expect(response.res.text).to.include("Log in error");
    });
  });
});