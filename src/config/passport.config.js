import passport from "passport";
import localStrategy from "passport-local";
import {createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/Models/users.model.js";
import GithubStrategy from "passport-github2";
import { config } from "./config.js";
import jwt from "passport-jwt";


const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const initPassport = () =>{
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
                    password:createHash(password)
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
                return done(null,user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`,
        },
        async(accessToken,refreshToken,profile,done) =>{
            try {
                const user = await usersModel.getUserByEmail(profile._json.email);
                if(user){
                    return done(null,user);
                }
                const newUser ={
                    name: profile._json.name,
                    email:profile._json.email,
                    password:createHash(profile.id),
                };
                const userCreated = await usersModel.addUser(newUser);
                return done (null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ))

    passport.use("loginGithubStrategy",new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`,
        },
          async (profile, done) => {
            try {
              const user = await usersModel.getUserByEmail(profile._json.email);
              if (!user) {
                return done(null, false);
              }
              return done(null, user);
            } catch (error) {
              return done(error);
            }
          }
        )
      );




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



