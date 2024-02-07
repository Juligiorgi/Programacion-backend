import { CustomError } from "../service/error/customError.service.js";
import { EEror} from "../enums/EEror.js";
import { userCreateError } from "../service/error/userCreateError.service.js";
import { UsersService } from "../service/user.service.js";



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
    static modifyRole = async(req,res)=>{
      try {
          const userId = req.params.uid;
          const user = await UsersService.getUserById(userId);
          // console.log(user);
          if(user.role === "premium"){
              user.role = "user";
          } else if(user.role === "user"){
              user.role = "premium";
          } else {
              res.json({status:"error", message:"No se puede cambiar el role del usuario"});
          }
          await UsersService.updateUser(user._id, user);
          res.json({status:"success", message:"rol de usuario modificado"});
      } catch (error) {
          res.json({status:"error", message:error.message});
      }
  };
  static uploadUserDocuments = async(req,res)=>{
    try {
      const userId =req.params.uid;
      const user = await UsersService.getUserById(userId);
      const identificacion = req.files['identificacion']?.[0] || null;
      const domicilio = req.files['identificacion']?.[0] || null;
      const estadDeCuenta = req.files['identificacion']?.[0] || null;
      const docs = [];
      if(identificacion){
          docs.push({name:"identificacion", reference: identificacion.filename});
      }
      if(domicilio){
          docs.push({name:"domicilio", reference: domicilio.filename});
      }
      if(estadoDeCuenta){
          docs.push({name:"estadoDeCuenta", reference: estadoDeCuenta.filename});
      }
      user.documents = docs;
      if(docs.length<3){
          user.status = "incompleto";
      } else {
          user.status = "completo";
      }
      await UsersService.updateUser(user._id, user);
      res.json({status:"success", message:"documentos actualizados"});
    } catch (error){
      res.json({status:"error", message:error.message});
    }
  };
};