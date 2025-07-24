import { upload } from "@config/multer";
import blogsController from "@controller/blogs.controller";
import { Router } from "express";


const router=Router();
router.get("/",blogsController.getBlog);
router.post("/",upload.array('image',10),blogsController.saveBlog);
// router.get("/:id",roleController.getRoleById);
// router.delete("/:id",roleController.deleteRoleById);
// router.patch("/:id",roleController.updateRoleById);

export { router as BlogRouter};