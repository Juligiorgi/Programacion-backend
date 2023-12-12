import dotenv from "dotenv";


dotenv.config();

export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION,
        enviroment: process.env.NODE_ENVIRONMENT,
    },
    mongo:{
        url:process.env.MONGO_URL,
    },
    token:{
        privateKey: process.env.PRIVATE_KEY,
      },

}
