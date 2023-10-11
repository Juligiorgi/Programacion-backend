import mongoose from "mongoose";


const cartsCollection = "carts";


const cartSchema = new mongoose.Schema({
    products:{
      type:[],
      default:[]
    } 
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);