import { ProductsService } from "../service/product.service.js";
import { EEror } from "../enums/EEror.js";
import { CustomError } from "../service/error/customError.service.js";
import { productCreateError } from "../service/error/productCreateError.service.js";

export class ProductsController{
    static getProducts = async(req,res)=>{
        try {
            const products = await ProductsService.getProducts();
            res.json({message:"endpoint para obtener los productos", data:products});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    static createProduct = async(req,res,next)=>{
        try {
            const productInfo = req.body;
            const {title} = productInfo;
            new Error("error de prueba");
            if(!title){
                console.log(productCreateError(productInfo));
                CustomError.createError({
                    name:"Create product error",
                    cause:productCreateError(productInfo),
                    message:"Datos invalidos al crear el producto",
                    errorCode:EEror.INVALID_BODY_JSON
                });
            }
            const result = await ProductsService.createProduct(productInfo);
            res.json({status:"success", result});
        } catch (error) {
            next(error);
        }finally{
            
        }
    };

    static getProduct = async(req,res)=>{
        try {
            const productId = req.params.pid;
            const product = await ProductsService.getProduct(productId);
            res.json({message:"endpoint para obtener un producto", data:product});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };
}