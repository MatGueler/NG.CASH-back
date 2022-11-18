import { Router } from "express";
import { RegisterUser } from "../Controller/UserController";

const userRouter = Router();

userRouter.post("/sign-up", RegisterUser);

export default userRouter;
