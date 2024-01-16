import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/mongo/models/users.model.js";
import { productsModel } from "../src/dao/mongo/models/products.model.js";

const requester = supertest(app);

describe("ecommerce test", async function () {
  describe("products router test", async function () {
    //product mock
    const productMock = {
      title: "Buzo",
      description: "Black",
      price: 1500,
      thumbnail:
        "https://acdn.mitiendanube.com/stores/001/097/570/products/217583488_4074146715974574_5326266433907510733_n1-ec21e630394eb9f31116263546622273-640-0.jpg",
      code: "produ1",
      stock: 1,
      status: true,
      category: "buzo",
    };

    beforeEach(async function () {
      this.cookie;
      await usersModel.deleteMany({});
      await productsModel.deleteMany({});
    });

    //add products
    it("add products with POST method", async function () {
      const mockUser = {
        firstName: "julieta",
        lastName: "giorgi",
        age: 22,
        email: "adminCoder@coder.com",
        password: "adminCoder123",
      };
      //crea un user admin
      const signup = await requester
        .post("/api/sessions/signup")
        .send(mockUser);

      //se registra
      const login = await requester
        .post("/api/sessions/login")
        .send({ email: mockUser.email, password: mockUser.password });

      const cookieResult = login.header["set-cookie"][0];

      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");
      //admin agrega un producto
      const response = await requester
        .post("/api/products")
        .send(productMock)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(response.body.message).to.be.equal(
        `${productMock.title} added successfully`
      );
    });

    //get products
    it("get all products with GET method, must return an []", async function () {
      const response = await requester.get("/api/products");
      expect(response.body).to.have.property("status");
      expect(response.body).to.have.property("data");
      expect(Array.isArray(response.body.data)).to.be.equal(true);
    });

    //get product by ID
    it("get product by ID with GET method, must return {}", async function () {
      const mockUser = {
        firstName: "julieta",
        lastName: "giorgi",
        age: 22,
        email: "adminCoder@coder.com",
        password: "adminCoder123",
      };
      //crea un user admin
      const signup = await requester
        .post("/api/sessions/signup")
        .send(mockUser);

      //se registra
      const login = await requester
        .post("/api/sessions/login")
        .send({ email: mockUser.email, password: mockUser.password });

      const cookieResult = login.header["set-cookie"][0];

      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");
      //admin agrega un producto
      const response = await requester
        .post("/api/products")
        .send(productMock)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(response.body.message).to.be.equal(
        `${productMock.title} added successfully`
      );
      const getProducts = await requester.get("/api/products");
      const pid = getProducts.body.data[0]._id;
      const getById = await requester.get(`/api/products/${pid}`);

      expect(getById.body.status).to.be.equal("success");
      expect(getById.body).to.have.property("data");
      expect(getById.body.data._id).to.be.equal(`${pid}`);
      expect(getById.body.data).to.be.an("object");
    });

    //update product
    it("update product with PUT method", async function () {
      const mockUser = {
        firstName: "julieta",
        lastName: "giorgi",
        age: 22,
        email: "adminCoder@coder.com",
        password: "adminCoder123",
      };
      //crea un user admin
      const signup = await requester
        .post("/api/sessions/signup")
        .send(mockUser);

      //se registra
      const login = await requester
        .post("/api/sessions/login")
        .send({ email: mockUser.email, password: mockUser.password });

      const cookieResult = login.header["set-cookie"][0];

      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");
      //admin agrega un producto
      const response = await requester
        .post("/api/products")
        .send(productMock)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(response.body.message).to.be.equal(
        `${productMock.title} added successfully`
      );

      const pid = response.body.data._id;
      productMock.price = 11111111;

      const update = await requester
        .put(`/api/products/${pid}`)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
        .send(productMock);
      expect(update.body.status).to.be.equal("success");
      expect(update.body.message).to.be.equal("product updated successfully");
      expect(update.body.data).to.be.an("object");
    });

    //delete product
    it("delete product with DELETE method", async function () {
      const mockUser = {
        firstName: "julieta",
        lastName: "giorgi",
        age: 22,
        email: "adminCoder@coder.com",
        password: "adminCoder123",
      };
      //crea un user admin
      const signup = await requester
        .post("/api/sessions/signup")
        .send(mockUser);

      //se registra
      const login = await requester
        .post("/api/sessions/login")
        .send({ email: mockUser.email, password: mockUser.password });

      const cookieResult = login.header["set-cookie"][0];

      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");
      //admin agrega un producto
      const response = await requester
        .post("/api/products")
        .send(productMock)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(response.body.message).to.be.equal(
        `${productMock.title} added successfully`
      );
      const pid = response.body.data._id;
      const deleteProduct = await requester
        .delete(`/api/products/${pid}`)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(deleteProduct.body.status).to.be.equal("success");
      expect(deleteProduct.body.message).to.be.equal(
        "product deleted successfully"
      );
    });
  });
});