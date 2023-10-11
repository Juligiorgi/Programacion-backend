import { Router } from "express";
import {cartsService} from "../persistence/index.js"

const router = Router();


router.get("/" , async (req,res)=>{
    try{
        const carts= parseInt(req.body)
        const allCarts= await cartsService.getCarts(carts);
        return res.json(allCarts);
    
    }catch (error){
        res.status(400).json({error:true,mensaje:error});
    }
});



router.post("/", async (req,res)=>{
    try{
        const cartCreated = await cartsService.createCart();
        res.json({data:cartCreated});
    } catch (error){
        res.json({error:error.mensaje});
    }
});


router.post("/:cid/product/:pid", async (req,res)=>{
    try{
        const cartId= parseInt(req.params.cid);
        console.log(cartId);
        const productId = parseInt (req.params.pid)
        const newProduct= await cartsService.addProduct(cartId,productId);
        res.json({mensaje:"peticion recibida",data:newProduct});
    }catch (error){
        res.json({error:error.mensaje});
    }
});


export {router as cartsRouter};