import dotenv from "dotenv";


dotenv.config();

export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url:'mongodb+srv:juligiorgi2536:juligiorgi123@codercluser.mab28uy.mongodb.net/primerLogin?retryWrites=true&w=majority&appName=AtlasApp'
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    token:{
    privateKey: process.env.PRIVATE_KEY,
    }
}
