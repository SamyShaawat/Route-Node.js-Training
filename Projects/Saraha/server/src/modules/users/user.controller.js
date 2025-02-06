import { Router } from "express";
import { signUp } from "./user.service.js";

const userRouter = Router();


userRouter.post("/signup", signUp);
// userRouter.get("/", getUsers);
// userRouter.patch("/:id", updateUser);



export default userRouter;