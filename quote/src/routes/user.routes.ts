import { Router, Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import { validateToken } from "../middlewares/authMiddlewares/validateToken";
// validateToken
const userRouter = Router();

userRouter.get("/", validateToken, userController.get);

export default userRouter;
