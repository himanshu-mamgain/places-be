import { Router } from "express";
import validatePayload from "../../middleware/validatePayload";
import { loginUserSchema, registerUserSchema } from "./user.validator";
import userController from "./user.controller";
import fileUpload from "../../middleware/fileUpload";

const router: Router = Router();

router.post(
  "/signup",
  fileUpload(),
  validatePayload(registerUserSchema),
  userController.registerUser
);

router.post(
  "/login",
  validatePayload(loginUserSchema),
  userController.loginUser
);

router.get("/", userController.getAllUsers);

export default router;
