import { Router } from "express";
import { generateUser } from "../helpers/mock.js";
import { UsersController } from "../controller/users.controller.js";
import { checkRole } from "../middleware/auth.js";


const router = Router();

router.post("/", UsersController.createUser);


router.get("/",(req,res) =>{
    const cant = parseInt(req.query.cant) || 15;
    let users = [];
    for(let i=0;i<cant;i++){
        const newUser= generateUser();
        users.push(newUser);
    };
    res.json({status:"success", data:users});
});

router.put("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole );

export {router as usersRoutes};