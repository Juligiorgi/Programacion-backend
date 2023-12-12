import { CustomError } from "../service/error/customError.service.js";
import { EEror} from "../enums/EEror.js";
import { userCreateError } from "../service/error/userCreateError.service.js";



export class UsersController{
    static createUser = (req,res) =>{
      const {name, lastname,email, age} = req.body;
      if(!name || !lastname || !email){
        CustomError.createError({
            name:"Error al create el usuario",
            cause:userCreateError(req.body),
            message:"Datos invalidos para crear el usuario ",
            errorCode: EEror.INVALID_BODY
        })
      }
      const newUser ={
        id:usersModel.length ++,
        name,
        lastname,
        age,
        email,
      };
      usersModel.push(newUser);
      res.json({status:"success", message:"usuario creado"})
    }
    
}
