import passport from "passport";
import localStrategy from "passport-local";
import {createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../persistence/mongo/Models/users.model.js";
import GithubStrategy from "passport-github2";
import { config } from "./config.js";
import { PRIVATE_KEY } from "../utils.js";
import jwt from "passport-jwt";


const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const initPassport = () =>{
    passport.use("sigupLocalStartegy", new localStrategy(
        {
         passReqToCallback: true,
         usernameField:"email",
        },
        async(req,username,password,done) =>{
            const {first_name} = req.body;
            try {
                const user = await usersModel.findOne({email:username});
                if(user){
                    return done(null,false);
                }
                const newUser ={
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                const userCreated = await usersModel.create(newUser);
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
                const user = await usersModel.findOne({email:username});
                if(!user){
                    //el usuario no esta registrado
                    return done(null,false);
                }
                if(!inValidPassword(password,user)){
                    return done(null,false);
                }
                //validamos que el usuario esta registrado y que la contraseña es correcta
                return done(null,user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080${config.github.callbackURL}`
        },
        async(access,refreshToken,profile,done) =>{
            try {
                const user = await usersModel.findOne({email:profile.username});
                if(user){
                    return done(null,user);
                }
                const newUser ={
                    first_name,
                    email:profile.username,
                    password:createHash(profile.id)
                };
                const userCreated = await usersModel.create(newUser);
                return done (null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ))




    passport.use("jwtAuth", new JWTStrategy(
        {
            jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        },
        async (jwtPayload,done)=>{
            try {
                return done (null,jwtPayload);
            } catch (error) {
                return done (error);
            }
        }
    ));


    const cookieExtractor =(req) =>{
        let token;
        console.log("req",req);
        if(req && req.cookies){
            token =req.cookies["cookieToken"];
        }else{
            token =null;
        }
        return token;
    }

};



