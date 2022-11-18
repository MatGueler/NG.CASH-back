import { Router } from "express";
import userRouter from "./UserRouter";

const routes = Router();

routes.use(userRouter);

export default routes;
