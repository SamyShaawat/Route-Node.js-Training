import { Router } from "express";
import { getUsers, signUp } from "./user.service.js";
const userRouter = Router();


userRouter.post("/signup", signUp)
userRouter.get("/", getUsers)




export default userRouter;