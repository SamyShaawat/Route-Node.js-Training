import { Router } from "express";
import { getAllUsers } from "./user.service.js";
const userRouter = Router();


userRouter.get("/", getAllUsers)



export default userRouter;