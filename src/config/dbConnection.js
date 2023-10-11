import mongoose from "mongoose";

export const connectDB = async ()=>{
    
    try {
        await mongoose.connect('mongodb+srv://juligiorgi2536:juligiorgi123@codercluser.mab28uy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`hubo un error conectando la base de datos: ${error.message}`);
    }
};
