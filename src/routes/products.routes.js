import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { isAuth, checkRole } from "../middleware/auth.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", isAuth, checkRole(["admin"]),ProductsController.createProduct);
router.get("/:pid", ProductsController.getProduct);

export {router as productsRouter};