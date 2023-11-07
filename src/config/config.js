import dotenv from "dotenv";


dotenv.config();

export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url:process.env.MONGO_URL
    },
    github:{
        
    }
}