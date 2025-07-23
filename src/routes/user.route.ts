import userController from "@controller/user.controller";
import { Router } from "express";

const router=Router();
router.get("/",userController.getUser);
router.post("/",userController.saveUser);

export { router as UserRouter};