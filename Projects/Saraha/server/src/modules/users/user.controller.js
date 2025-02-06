import { Router } from "express";
import { signIn, signUp } from "./user.service.js";

const userRouter = Router();


userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
// userRouter.get("/", getUsers);
// userRouter.patch("/:id", updateUser);



export default userRouter;