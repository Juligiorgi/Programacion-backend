import { clothesDao } from "../persistence/index.js";


export class ClothesService{
    static getClothes(){
        return clothesDao.get();
    };

    static saveClothe(clothe){
        return clothesDao.save(clothe)
    };
}