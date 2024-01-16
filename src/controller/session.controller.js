import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";
import { UsersService } from "../service/user.service.js";
import { createHash, inValidPassword } from "../utils.js";



export class SessionsController{
    static redirectLogin = (req,res)=>{
        res.redirect("/login");
    };

    static failSignup = (req,res)=>{
        res.render("signup",{error:"No se pudo registrar al usuario"});
        
    };

    static redirecProfile = (req,res)=>{
        res.redirect("/logueado")
    };


    static failLogin = (req,res)=>{
        res.render("login",{error:"No se pudo iniciar sesion para el usuario"});
        
    };

    static forgotPassword = async (req,res) =>{
      const {email} = req.body;
      console.log(email);
      try {
        const user = await UsersService.getUserByEmail(email);
        console.log(user);
        const emailToken = generateEmailToken(email,10 * 60)
        await sendChangePasswordEmail(req,email,emailToken);
        res.send(`Se envio un enlace a su correo, <a href= "/"> Volver a la pagina de login </a>`);
      } catch (error) {
        res.json({status:"error", message:error.message})
      }
    };

    static resetPassword = async (req,res) =>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = verifyEmailToken(token);
            if (!validEmail) {
                return res.send(`El enlace ya expiro, genera uno nuevo <a href="/forgot-password">enlace</a>`);
            }
            const user = await UsersService.getUserByEmail(validEmail);
            if(!user){
                return res.send(`Esta operacion ya no es valida`);
            }
            if (inValidPassword(newPassword,user)) {
                return res.render("resetPassView", {error:" No es posible usar esa contraseña", token})
            }
            const userData ={
                ...user,
                password: createHash(newPassword)
            };
            await UsersService.updateUser(user._id, userData);
            res.render("Login", {message:"Constraseña actualizada"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}