import { Router } from "express";
import { gerUsers } from "./user.service.js";
const userRouter = Router();


userRouter.get("/", gerUsers)



export default userRouter;