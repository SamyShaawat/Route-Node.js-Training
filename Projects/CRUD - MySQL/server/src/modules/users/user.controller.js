import { Router } from "express";
import { createUser, getAllUsers } from "./user.service.js";

const userRouter = Router();


userRouter.get("/", getAllUsers);
userRouter.post("/create-user", createUser);





export default userRouter;