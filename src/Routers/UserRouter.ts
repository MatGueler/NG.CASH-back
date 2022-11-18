import { Router } from "express";
import { RegisterUser } from "../Controller/UserControler";

const userRouter = Router();

userRouter.post("/sign-up", RegisterUser);

export default userRouter;
