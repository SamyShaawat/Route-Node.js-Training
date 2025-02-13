import { Router } from "express";
import { confirmEmail, getProfile, signIn, signUp } from "./user.service.js";
import { authentication } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { signUpSchema } from "./user.validation.js";

const userRouter = Router();


userRouter.post("/signUp", validation(signUpSchema), signUp);
userRouter.post("/signIn", signIn);

userRouter.get("/confirmEmail/:token", confirmEmail);
userRouter.get("/getProfile", authentication, getProfile);




export default userRouter;