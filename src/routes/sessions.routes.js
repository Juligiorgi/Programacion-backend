import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { generateToken } from "../utils.js";

const router = Router();

//sign up
router.post("/signup",passport.authenticate("sigupLocalStartegy",{
  session:false,
  failureRedirect:"/api/sessions/fail-signup"
}), async (req, res) => {
    res.render("loginView", { message: "Usuario registrado correctamente" });
    
});

router.get("/fail-signup",(req,res)=>{
  res.render("signupView", { error: "No se pudo registrar" });
});


//login
router.post("/login", passport.authenticate ("loginLocalStrategy",{
  session:false,
  failureRedirect:"/api/sessions/fail-login"
}), (req,res) =>{
    const token = generateToken(req.user);
    res.cookie("cookiesToken",token).json({status:"success", message:"login exitoso"});
    //res.redirect("/profile")
});

router.post("/profile", passport,authenticate("jwtAuth",{
  session:false,
  failureRedirect:"/api/sessions/fail-auth"
}) ,(req,res)=>{
 
  res.json({status:"success",message:"peticion recibida", data:req.user});
});

router.get("/fail-auth",(req,res)=>{
  res.json({status:"error", message:"token invalido"});
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy(err=>{
      if(err) return res.render("profileView",{error:"Nose pudo cerrar la sesion"})
      res.redirect("/");
    })
  } catch (error) {
    res.render("signupView", { error: "No se pudo registrar" });
  }
});

//Registrarse con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"));

router.get(config.github.callbackUrl, passport.authenticate("singupGithubStrategy",{
  failureRedirect:"/api/sessions/fail-singup"
}),(req,res) =>{
    res.redirect("/profile");
});


export { router as sessionsRouter };