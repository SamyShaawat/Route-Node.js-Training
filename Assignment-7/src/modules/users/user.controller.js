import { Router } from "express";
import { alterTable, getUsers, logIn, signUp } from "./user.service.js";
const userRouter = Router();


userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.post("/alter-table", alterTable)
userRouter.get("/", getUsers)




export default userRouter;