import express, { Router} from "express";
import userRouter from "./user.routes";
import taskRouter from "./taskRouter";

const routes = Router();

routes.use(express.json());
routes.use('/user', userRouter);
routes.use('/task', taskRouter);

export default routes;