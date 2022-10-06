import { Router, Request, Response } from "express";
import { authController } from "../controllers/auth.controller";
import {
  validateSignUp,
  validatePreSignUp,
  validateSignin,
  validateEmail,
  validateNewPassword,
} from "../middlewares/authMiddlewares/validateBody";
const authRouter = Router();

authRouter.post("/signup", validateSignUp, authController.signUp);
authRouter.get("/get", authController.get);
authRouter.post("/signin", validateSignin, authController.signIn);

export default authRouter;
