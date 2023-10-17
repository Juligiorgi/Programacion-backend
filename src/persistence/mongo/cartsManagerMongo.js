import { cartModel } from "./Models/carts.model.js";



export class CartsManagerMongo{
    constructor(){
        this.model=cartModel;
    };

    async getCarts(){};

    async getCartById(cartId){
        try {
            const result = await this.model.findById(cartId).populate("products,productId");
            if(!result){
                throw new Error (`El carrito con el ID: '${cartId}'no existe`);
            };
            return result;
        } catch (error) {
           console.log(error.message);
           throw new Error ("No se puedo obtener el carrito"); 
        }
    };
    async createCarts(){
        try {
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
           console.log(error.message);
           throw new Error ("No se puedo crear el carrito"); 
        }
    };
    async addProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            //const productExist = cart.products.find(elm=>elm.productId == productId);
            const newProductCart ={
                productId:productId,
                quantity:1
            }
            cart.products.push(newProductCart);
            const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
            return result;
        } catch (error) {
           console.log(error.message);
           throw new Error ("No se puedo agregar el producto al carrito"); 
        }
    };

    async deleteProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(elm => elm.productId._id == productId);
            if(productExist){
              const newProducts = cart.products.filter(elm => elm.productId._id != productId);
              cart.products = newProducts;
              const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
              return result;
            }else{
                throw new Error ("El producto no se puede eliminar")
            }
        } catch (error) {
           console.log("deleteProduct", error.message);
           throw new Error ("No se puedo agregar el producto al carrito"); 
        }
    };

    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.findIndex(elm => elm.productId._id == productId);
            if(productIndex>=0 ){
                console.log(cart.products[productIndex])
                cart.products[productIndex]. quantity = newQuantity;
          const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
          return result;
         }else{
            throw new Error ("El producto no se puede actualizar ")
          }
       } catch (error) {
         console.log("updateProductCart", error.message);
          throw new Error ("No se puedo actualizar el producto del carrito"); 
        }
    };
};
