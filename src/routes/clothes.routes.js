import { Router } from "express";
import { ClothesController } from "../controller/clothes.controller.js";


const router = Router();

router.get("/", ClothesController.getClothes);

router.post("/", ClothesController.saveClothe);

export {router as clothesRouter}
