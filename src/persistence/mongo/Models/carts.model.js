import mongoose from "mongoose";


const cartsCollection = "carts";


const cartSchema = new mongoose.Schema({
    products:{
      type:[
        {
          productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
          },
          quantity:{
            type:Number,
            required:true
          },
          _id: false
        },
      ],
      default:[]
    },
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);