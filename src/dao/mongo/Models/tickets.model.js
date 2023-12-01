import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code:{type:String, require:true},
    purchase_datetime:{type:Date},
    amount:{type:Number, require:true},
    purchaser:{type:String, require:true}
});

export const ticketsModel = mongoose.model(ticketCollection,ticketSchema);