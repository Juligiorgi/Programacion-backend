import { ClothesService } from "../service/clothes.service.js";

export class ClothesController{
    static getClothes = (req,res)=> {
        const result = ClothesService.getClothes();
        res.json ({status:"success", data:result});
    };


    static saveClothe =  (req,res) =>{
        const clotheInfo = req.body;
        const result = ClothesService.saveClothe(clotheInfo);
        res.json({status:"success", data:result});
    };    
}