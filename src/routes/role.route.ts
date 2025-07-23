// http://localhost:5000/docs/
import roleController  from "@controller/role.controller";
import { Router } from "express";

const router=Router();

router.get("/",roleController.getAll);
router.post("/",roleController.saveRole);
router.get("/:id",roleController.getRoleById);
router.delete("/:id",roleController.deleteRoleById);
router.patch("/:id",roleController.updateRoleById);
/**
  @openapi
  /role:
* post:
*     summary: summary
*     tags:
*       - Role
*     requestBody:
*       required: true
*       content:
*         application/json:
*     responses:
*       201:
*         description: Role created successfully
*/
export {router as roleRouter};