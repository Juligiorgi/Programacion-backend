import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/mongo/models/users.model.js";
import { cartsModel } from "../src/dao/mongo/models/carts.model.js";
import { productsModel } from "../src/dao/mongo/models/products.model.js";

const requester = supertest(app);

describe("ecommerce test", async function () {
  describe("carts router test", async function () {
    before(async function () {
      this.cookie;
      await usersModel.deleteMany({});
      await cartsModel.deleteMany({});
      await productsModel.deleteMany({});
    });

    //get all carts
    it("get all carts with GET method, must return an []", async function () {
      const response = await requester.get("/api/carts");
      expect(response.status).to.be.equal(200);
      expect(Array.isArray(response.body.data)).to.be.equal(true);
    });
    //add cart
    it("add cart with POST method", async function () {
      const response = await requester.post("/api/carts");
      expect(response.body.status).to.be.equal("success");
      expect(response.body.message).to.be.equal("cart added successfully");
      expect(response.body.data).to.be.an("object");
    });
    //get cart id
    it("get cart by ID with GET method, must return an {}", async function () {
      const response = await requester.post("/api/carts");
      const cid = response.body.data._id;
      const getById = await requester.get(`/api/carts/${cid}`);
      expect(getById.status).to.be.equal(200);
      expect(getById.body.cart._id).to.be.equal(`${cid}`);
    });
    //delete cart
    it("delete cart with DELETE method", async function () {
      const response = await requester.post("/api/carts");
      const cid = response.body.data._id;
      const deleteCart = await requester.delete(`/api/carts/${cid}`);
      expect(deleteCart.body.status).to.be.equal("success");
      expect(deleteCart.body.message).to.be.equal("cart deleted successfully");
    });
    //agregar productos al arreglo del carrito seleccionado
    it("add products to cart with POST method", async function () {
      const response = await requester.post("/api/carts");
      const cid = response.body.data._id;

      const userAdmin = {
        firstName: "julieta",
        lastName: "giorgi",
        age: 22,
        email: "adminCoder@coder.com",
        password: "adminCoder123",
      };
      //crea un user admin
      const signup = await requester
        .post("/api/sessions/signup")
        .send(userAdmin);

      //se registra
      const login = await requester
        .post("/api/sessions/login")
        .send({ email: userAdmin.email, password: userAdmin.password });

      const cookieResult = login.header["set-cookie"][0];

      const cookieData = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      this.cookie = cookieData;
      expect(this.cookie.name).to.be.equal("cookieToken");

      //admin agrega un producto
      const productMock = {
        title: "top",
        description: "Top negro con estampa",
        price: 1000,
        thumbnail:
          "https://http2.mlstatic.com/D_NQ_NP_910187-MLA54975989633_042023-O.webp",
        code: "Produc2",
        stock: 2,
        status: true,
        category: "top",
      };
      const addProduct = await requester
        .post("/api/products")
        .send(productMock)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
      expect(addProduct.body.message).to.be.equal(
        `${productMock.title} added successfully`
      );

      console.log(addProduct);
    });
    //eliminar product del cart
    it("delete product from cart with DELETE ", async function () {});
    //actualizar quantity del product en el cart
    it("update products in cart with PUT method", async function () {});
    //purchase
    it("finalize purchase with POST method", async function () {});
  });
});