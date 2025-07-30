// http://localhost:5000/docs/
import roleController  from "@controller/role.controller";
import { Router } from "express";

const router=Router();
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
router.get("/",roleController.getAll);
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
router.post("/",roleController.saveRole);
router.get("/:id",roleController.getRoleById);
router.delete("/:id",roleController.deleteRoleById);
router.patch("/:id",roleController.updateRoleById);

export {router as roleRouter};