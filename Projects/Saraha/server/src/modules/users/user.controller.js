import { Router } from "express";
import * as US from "./user.service.js";
import * as UV from "./user.validation.js";
import { authentication } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";

const userRouter = Router();


userRouter.post("/signUp", validation(UV.signUpSchema), US.signUp);
userRouter.post("/signIn", US.signIn);
userRouter.get("/confirmEmail/:token", US.confirmEmail);
userRouter.get("/getProfile", authentication, US.getProfile);




export default userRouter;