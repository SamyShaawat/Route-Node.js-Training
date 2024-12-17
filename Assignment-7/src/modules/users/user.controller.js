import { Router } from "express";
import { getUsers } from "./user.service.js";
const userRouter = Router();


userRouter.get("/", getUsers)



export default userRouter;