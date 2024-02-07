import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from 'multer';
import { fa } from '@faker-js/faker';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const inValidPassword = (password,user) =>{
    return bcrypt.compareSync(password,user.password);
};


export const PRIVATE_KEY="coderSecretToken";

export const generateToken = (user) => {
    const token = jwt.sign({first_name:user.first_name,email:user.email}, PRIVATE_KEY,{expiresIn:"24h"});
    return token;
};

const checkValidFields =(user) =>{
    const {first_name,email,password} = user;
    if(!first_name || !email || !password){
        return false;
    }else{
        return true;
    }
};
//filtro para subir imagenes
const profileMulterFilter =(req,file,cb)=>{
    if(!checkValidFields(req.body)){
        cb(null,false);
    }else{
        cb(null, true);
    }
};


const profileStorage = multer.diskStorage({
   destination: function(req,file,cb){
    cb(null, path.join(__dirname,"multer/users/img"))
   },

   filename: function(req,file,cb){
    cb(null,`${req.body.email}-perfil-${file.originalname}`)
   }
});

const uploadProfile = multer({storage: profileStorage, fileFilter: profileMulterFilter});

const documentsStorage = multer.diskStorage({
    destination: function(req,file,cb){
     cb(null, path.join(__dirname,"multer/users/documents"))
    },
 
    filename: function(req,file,cb){
     cb(null,`${req.body.email}-document-${file.originalname}`)
    }
});
const uploadDocuments = multer({storage: documentsStorage});

const imgProductsStorage = multer.diskStorage({
    destination: function(req,file,cb){
     cb(null, path.join(__dirname,"multer/products/img"))
    },
 
    filename: function(req,file,cb){
     cb(null,`${req.body.code}-product-${file.originalname}`)
    }
});
const uploadProducts = multer({storage: imgProductsStorage});

export{uploadProfile,uploadDocuments,uploadProducts};










