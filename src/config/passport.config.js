import passport from "passport";
import localStrategy from "passport-local";
import {createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/Models/users.model.js";
import { config } from "./config.js";
import jwt from "passport-jwt";



const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const initializePassport = () =>{
    passport.use("sigupLocalStrategy", new localStrategy(
        {
         passReqToCallback: true,
         usernameField:"email",
        },
        async(req,username,password,done) =>{
            const {name, lastname,age} = req.body;
            try {
                const user = await usersModel.getUserByEmail(username);
                if(user){
                    return done(null,false);
                }
                const newUser ={
                    name,
                    lastname,
                    age,
                    email:username,
                    password:createHash(password),
                    avatar: req.file.filename
                };
                const userCreated = await usersModel.addUser(newUser);
                return done (null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));


    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField:"email", 
        },
        async (username,password,done)=>{
            try {
                const user = await usersModel.getUserByEmail(username);
                if(!user){
                    //el usuario no esta registrado
                    return done(null,false);
                }
                if(!inValidPassword(password,user)){
                    return done(null,false);
                }
                //validamos que el usuario esta registrado y que la contraseña es correcta
                user. last_connection = new Date();
                await usersDao.updateUser(user._id, user);
                return done(null,user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("jwtAuth", new JWTStrategy(
        {
            jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.token.privateKey,
        },
        async (jwtPayload,done)=>{
            try {
                return done (null,jwtPayload);
            } catch (error) {
                return done (error);
            }
        }
    ));


};

const cookieExtractor =(req) =>{
    let token;
    if(req && req.cookies){
        token =req.cookies["cookieToken"];
    }else{
        token =null;
    }
    return token;
}



