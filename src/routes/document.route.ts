import categoryController from "@controller/category.controller";
import  DocumentController  from "@controller/document.controller";
import { Router } from "express";


const router=Router();
router.get("/",DocumentController.getDocument);
router.post("/",DocumentController.saveDocument);

export { router as DocumentRouter};