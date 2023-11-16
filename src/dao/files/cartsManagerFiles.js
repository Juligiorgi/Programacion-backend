import fs from "fs";

  export class CartsManagerFiles{
    constructor(path){
        this.pathFile = path;
    };

    fileExist(){
        return fs.existsSync(this.pathFiles);
    };


    async getCarts(){
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles,"utf-8");
                const carts = JSON.parse(contenidoString);
                return carts;
            } else {
                throw new Error("No se pudieron obtener los productos");
            }
        } catch (error) {
            throw error;
        }
    };
    
    async createCart() {
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles,"utf-8");
                const cart = JSON.parse(contenidoString);
                let idCart;
                cart.length === 0 ? idCart = 1 : idCart = cart.length + 1

                const newCart = {
                    idCart,
                    products: [],
                };
                cart.push(newCart);
                await fs.promises.writeFile(this.pathFiles, JSON.stringify(cart, null, '\t'));
                return `Se creó un nuevo carrito ${newCart}`;
            } else {
                throw new Error("No se pudo crear el carrito")
            };
        } catch (error) {
            console.log(error.mensaje);
            throw error;
        };
    };
    async addProduct(cartId, productId){
        console.log("id prod" ,productId);
        try {
            if (this.fileExist()) {
                const contenidoString = await fs.promises.readFile(this.pathFiles, "utf-8");
                const carts = JSON.parse(contenidoString);
                const cart = carts.find((item) => item.idCart === cartId);
                if(cart){
        
                const products =cart.products.find((product) => product.id === productId);
                   
                if (products) {
                     products.quantity += 1;
                 } else {
                        const newProduct = {
                            id: productId,
                            quantity: 1,
                        };
                         cart.products.push(newProduct);
                    }
        
                  const carritoNuevo = carts.filter((item)=>item.idCart !== cartId);
                  carritoNuevo.push(cart);
                  await fs.promises.writeFile(this.pathFiles,JSON.stringify(carritoNuevo,null, '\t'));
                   
                  return` Se agregó el producto al carrito ${cartId}`;
                } else {
                    return` No se encontró el carrito con el id ${cartId}`;
                }
            } else {
                throw new Error("No se pudo agregar el producto al carrito");
            }
       
             } catch (error) {
               console.log(error.mensaje);
                throw error;
            }
    }
    
};
