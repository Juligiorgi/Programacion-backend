import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils.js";


const router = Router();

//sign up
router.post("/signup",passport.authenticate("sigupLocalStrategy",{
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
}), async (req,res) =>{
    const token = generateToken(req.user);
    res.cookie("cookiesToken",token).json({status:"success", message:"login exitoso"});
    
});
router.get("/fail-login",(req,res) =>{
  res.render("login",{
    error: "login error",
  });
});

router.post("/profile", passport.authenticate("jwtAuth",{
  session:false,
  failureRedirect:"/api/sessions/fail-auth"
}), async (req,res) =>{
 try {
  res.json({status:"success",message:"peticion recibida", data:req.user});
 } catch (error) {
  console.log(error);
 }
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

router.get("/logout", async (req,res) =>{
  try {
    res.clearCookie("cookieToken");
    res.redirect("/");
  } catch (error) {
    res.render("profile",{error:"logout error"});
  }
});


export { router as sessionsRouter };