import { Router } from "express";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/",(req,res)=>{
  res.render("Home");
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTime");
});

router.get("/Login",(req,res)=>{
  res.render("loginView");
});

router.get("/Profile",(req,res)=>{
  if(req.user?.email){
    const userEmail = req.user.email;
    res.render("Profile", {userEmail});
  }else{
    res.redirect("/login");
  }

});

router.get("/singupView",(req,res)=>{
  res.render("singupView");
});

router.get("/testLogger", (req,res) =>{
  logger.error("log error");
  logger.warning("log warning");
  logger.debbug("log debbug");
  res.send("prueba logger");
});

router.get("/forgot-password", (req,res) =>{
  res.render("forgotPassView");
});

router.get("/reset-password", (req,res) =>{
  const token = req.query.token;
  res.render("resetPassView", {token});
})

export {router as viewsRouter};