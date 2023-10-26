import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

//sign up
router.post("/signup",passport.authenticate("sigupLocalStartegy",{
  failureRedirect:"/api/sessions/fail-signup"
}), async (req, res) => {
    res.render("loginView", { message: "Usuario registrado correctamente" });
    
});

router.get("/fail-signup",(req,res)=>{
  res.render("signupView", { error: "No se pudo registrar" });
});


//login
router.post("/login", async (req, res) => {
  try {
    const loginForm = req.body;
    const user = await usersModel.findOne({email:loginForm.email});
    if(!user){
      return res.render("loginView",{error:"Este usuario no esta registrado"});
    }
    //contraseña
    if(!inValidPassword(loginForm.password,user)){
      return res.render("loginView", {error:"Credenciales incorrectas"});
    }
    //usuario existente
    req.session.email = user.email;
    res.redirect("/Profile");
  } catch (error) {
    res.render("loginView", { error: "No se pudo iniciar la sesion" });
  }
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