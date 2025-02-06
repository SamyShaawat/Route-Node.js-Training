import { Router } from "express";
import { getProfile, signIn, signUp } from "./user.service.js";

const userRouter = Router();


userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.get("/getProfile", getProfile);
// userRouter.patch("/:id", updateUser);



export default userRouter;