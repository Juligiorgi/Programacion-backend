import fs from "fs";
import {title} from "process";

export class ProductsManagerFiles{
    constructor(path){
        this.pathFiles = path;
    };

    fileExist(){
        return fs.existsSync(this.pathFiles);
    }

    async createProduct(productInfo){
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles,"utf-8");
                const products = JSON.parse(contenidoString);
                let idProduct;
                products.length === 0 ? idProduct = 1 : idProduct = products.length + 1
            
                let newProduct={
                    id:idProduct,
                    title: productInfo.title,
                    description: productInfo.description,
                    price: productInfo.price,
                    code: productInfo.code
                };
             products.push(newProduct);
                await fs.promises.writeFile(this.pathFiles, JSON.stringify(products, null, '\t'));
                return `Se creó un nuevo carrito ${newProduct}`;
            } else {
                throw new Error("No se pudieron obtener los productos");
            }
            } catch (error) {
            throw error;
            }
    }

    async getProducts(){
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles,"utf-8");
                const products = JSON.parse(contenidoString);
                return products;
            } else {
                ("No se pudieron obtener los productos");
            }
        } catch (error) {
            throw error;
        }
    };

    async getProductById(productId){
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFiles,"utf-8");
                const products = JSON.parse(contenidoString);
                const product = products.find(prod=>prod.id === productId);
                if(!product){
                    throw new Error("El producto no existe");
                }
                return product;
            } else {
                throw new Error("No se pubo obtener el producto");
            }
        } catch (error) {
            throw error;
        }
    };

    async updateProduct(productId, productInfo) {
        try {
          const products = await this.getProducts();
          const product = products.findIndex(prod => prod.id === productId);
          if (product=== -1) {
            throw new Error("Producto no encontrado");
          }
          const updateProduct = {
            ...products[product],
            ...productInfo,
            id
          };
          products[product] = updateProduct;
          await fs.promises.writeFile(this.pathFiles, JSON.stringify(products, null, "\t"));
          console.log("Producto actualizado:", updateProduct);
          return updateProduct;
        } catch (error) {
          throw new Error("Error al actualizar producto.");
        }
    } 
    
    async deleteProduct(productId) {
        try {
          const products = await this.getProducts();
          const product = products.findIndex(prod => prod.id === productId);
          if (product === -1) {
            throw new Error("Producto no encontrado");
          }
          const deleteProduct = products.splice(product, 1)[0];
          await fs.promises.writeFile(this.pathFiles,JSON.stringify(products, null, "\t"));
          console.log("Producto eliminado:", deleteProduct);
          return deleteProduct;
        } catch (error) {
          throw new Error("Error al eliminar producto.");
        }
      }

};