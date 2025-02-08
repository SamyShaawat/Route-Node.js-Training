import { Router } from "express";
import { getProfile, signIn, signUp } from "./user.service.js";
import { authentication } from "../../middleware/auth.js";

const userRouter = Router();


userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.get("/getProfile", authentication, getProfile);
// userRouter.patch("/:id", updateUser);



export default userRouter;