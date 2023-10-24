import { Router } from "express";
import { usersModel } from "../persistence/mongo/Models/users.model.js";

const router = Router();

//sign up
router.post("/signup", async (req, res) => {
  try {
    const signupForm = req.body;
    const result = await usersModel.create(signupForm);
    if (result) {
      res.render("loginView", { message: "Usuario registrado correctamente" });
    }
  } catch (error) {
    res.render("signupView", { error: "No se pudo registrar" });
  }
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
    if(user.password !== loginForm.password){
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



export { router as sessionsRouter };