import { Router } from "express";
import { createOrUpdateUser, getUserByEmail, getUserById, signUp } from "./user.service.js";
const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.put("/create-or-update-user/:id", createOrUpdateUser);
userRouter.get("/get-user-by-email", getUserByEmail);
userRouter.get("/get-user-by-id/:id", getUserById);

export default userRouter;