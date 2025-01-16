import { Router } from "express";
import { createUser, getAllUsers, readUser } from "./user.service.js";

const userRouter = Router();


userRouter.get("/", getAllUsers);
userRouter.post("/create-user", createUser);
userRouter.get("/read-user/:id", readUser);





export default userRouter;