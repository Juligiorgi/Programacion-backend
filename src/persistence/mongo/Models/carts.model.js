import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


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
cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model(cartsCollection, cartSchema);