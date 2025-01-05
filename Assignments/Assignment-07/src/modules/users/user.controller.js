import { Router } from "express";
import { alterTable, logIn, signUp, truncateTable } from "./user.service.js";
const userRouter = Router();


userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/alter-table", alterTable);
userRouter.post("/truncate-table", truncateTable);




export default userRouter;