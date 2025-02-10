import { Router } from "express";
import { confirmEmail, getProfile, signIn, signUp } from "./user.service.js";
import { authentication } from "../../middleware/auth.js";

const userRouter = Router();


userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);

userRouter.get("/confirmEmail/:token", confirmEmail);
userRouter.get("/getProfile", authentication, getProfile);




export default userRouter;