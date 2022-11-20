import { Router } from "express";
import { LoginUser, RegisterUser } from "../Controller/UserController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import loginSchema from "../Schemas/LoginSchema";
import registerSchema from "../Schemas/RegisterSchema";

const userRouter = Router();

userRouter
  .post("/sign-up", validateSchema(registerSchema), RegisterUser)
  .post("/sign-in", validateSchema(loginSchema), LoginUser);

export default userRouter;
