import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true 
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        enum:["Libertad","Tendencia","Energia"]
    },
    stock:{
        type:Number,
        required:true 
    },
    thumbnail:String,
});
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);