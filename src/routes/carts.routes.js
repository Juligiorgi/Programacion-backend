import { Router } from "express";
import {cartsService, productsService} from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});


router.get("/:cid" , async (req,res)=>{
    try{
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        res.json({status:"success", data:cart});
    
    }catch (error){
        res.json({error:error.message});
    }
});



router.post("/", async (req,res)=>{
    try{
        const cartCreated = await cartsService.createCart();
        res.json({status: "success", data: cartCreated});
    } catch (error){
        res.json({status: "error", error:error.mensaje});
    }
});


router.put("/:cid/product/:pid", async (req,res)=>{
    try{
        const {cid:cartId, pid:productId} =req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.addProduct(cartId,productId);
        res.json({status:"success", result});
    }catch (error){
        res.json({error:error.mensaje});
    }
});

router.delete("/:cid/products/:pid", async(req,res)=>{
    try{
        const {cid:cartId, pid:productId} =req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.deleteProduct(cartId,productId);
        res.json({status:"success", result});
    }catch (error){
        res.json({error:error.mensaje});
    }
});

router.put("/:cid/products/:pid", async(req,res)=>{
    try{
        const {cid:cartId, pid:productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
        res.json({status:"success", result});
    }catch (error){
        res.json({error:error.mensaje});
    }
});


export {router as cartsRouter};