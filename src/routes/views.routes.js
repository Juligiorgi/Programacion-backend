import { Router } from "express";

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
  if(req.session.email){
    const userEmail = req.session.email;
    res.render("Profile", {userEmail});
  }else{
    res.redirect("/login");
  }

});

router.get("/singupView",(req,res)=>{
  res.render("singupView");
});

export {router as viewsRouter};