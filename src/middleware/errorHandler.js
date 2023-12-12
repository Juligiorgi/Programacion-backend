import { EEror } from "../enums/EEror.js";


export const errorHandler = (error,req,res,next) =>{
    console.log("errorHandler", error);
    switch (error.code) {
        case EEror.DATABASE_ERROR:
            res.json({status:"error", error:error.cause});
            break;
        case EEror.INVALID_BODY:
            res.json({status:"error", error:error.message});
            break;
        case EEror.INVALID_PARAM:
            res.json({status:"error", error:error.cause, message:error.message});
            break;
        case EEror.PRODUCTS_ERROR:
            res.json({satus:"error", error: error.cause, message:error.mesage});
            break;    
        default:
            break;
    }
}