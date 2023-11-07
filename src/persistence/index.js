
import { __dirname } from "../utils.js";

import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import {CartsManagerMongo} from "./mongo/cartsManagerMongo.js";
import { chatManagerMongo} from "./mongo/chatManagerMongo.js";
import {UsersManagerMongo} from "./mongo/usersManagerMongo.js"
 


export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new chatManagerMongo();
export const usersService = new UsersManagerMongo();



