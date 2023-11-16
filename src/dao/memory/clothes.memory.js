const clothes = [];

export class ClothesMemory{
    get(){
        return clothes;    
    };
    save(clothe){
        clothes.push(clothe);
        return "Ropa creada";
    };
}