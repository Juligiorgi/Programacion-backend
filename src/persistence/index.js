import { ProductsManagerFiles } from "./files/productsManagerFiles.js";
import { CartsManagerFiles } from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";



const productsService = new ProductsManagerFiles(path.join(__dirname,"/files/products.json"));
const cartsService = new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));






