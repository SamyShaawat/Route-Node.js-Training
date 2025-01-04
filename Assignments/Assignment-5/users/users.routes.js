import { Router } from "express";
import { getAllUsers, addUser, deleteUser, updateUser, getUserByName, getUserByID } from "./users.controller.js";

const userRouter = Router();


userRouter.get("/", getAllUsers);
userRouter.post("/addUser", addUser);
userRouter.patch("/updateUser/:id", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.get("/getUserByName", getUserByName);
userRouter.get("/getUserByID/:id", getUserByID);

export default userRouter;
