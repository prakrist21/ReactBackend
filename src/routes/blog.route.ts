import blogsController from "@controller/blogs.controller";
import { Router } from "express";


const router=Router();
router.get("/",blogsController.getBlog);
router.post("/",blogsController.saveBlog);
// router.get("/:id",roleController.getRoleById);
// router.delete("/:id",roleController.deleteRoleById);
// router.patch("/:id",roleController.updateRoleById);

export { router as BlogRouter};