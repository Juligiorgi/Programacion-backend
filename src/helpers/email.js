import { config } from "../config/config.js";
import jwt  from "jsonwebtoken";
import { transporter } from "../config/email.js";

export const generateEmailToken = (email, expireTime) =>{
    const token = jwt.sign({email},config.gmail.secretToken,{expireTime:expireTime});
    return token;
};

export const sendChangePasswordEmail= async (req,userEmail,token) =>{
    const domain = `${req.protocol}://${req.get('host')}`;
    const link = `${domain}/reset-password?token=${token}`;

    await transporter.sendMail({
        from:"Eccommers",
        to: userEmail,
        subject: "Restablecer contraseña",
        html: `
          <div>
               <h2>Hola</h2>
               <p>Solicitaste restablecer tu contraseña, click aqui:</p>
               <a href="${link}">
                  <button>
                      Restablecer contraseña
                  </button>  
                </a>
            </div>      
        `
    })
};

export const verifyEmailToken =(token) =>{
    try {
        const info =  jwt.verify(token,config.gmail.secretToken);
        return info.email;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};