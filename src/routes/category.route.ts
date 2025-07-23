import categoryController from "@controller/category.controller";
import { Router } from "express";


const router=Router();
router.get("/",categoryController.getCategory);
router.post("/",categoryController.saveCategory);
// router.get("/:id",roleController.getRoleById);
// router.delete("/:id",roleController.deleteRoleById);
// router.patch("/:id",roleController.updateRoleById);

export { router as CategoryRouter};