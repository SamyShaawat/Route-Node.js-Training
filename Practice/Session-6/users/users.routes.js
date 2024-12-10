const { Router } = require("express");
const { getUsers, addUser, deleteUser, updateUser } = require("./users.controller.js");

const userRouter = Router();


userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
