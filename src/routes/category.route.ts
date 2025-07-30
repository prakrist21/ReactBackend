import categoryController from "@controller/category.controller";
import { Router } from "express";


const router=Router();
router.get("/",categoryController.getCategory);
router.post("/",categoryController.saveCategory);

export { router as CategoryRouter};