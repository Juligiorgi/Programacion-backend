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
        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
    }
}