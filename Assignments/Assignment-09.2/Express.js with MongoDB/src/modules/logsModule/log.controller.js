import { Router } from "express";
import { addLog, createCappedCollection } from "./log.service.js";
const logRouter = Router();



logRouter.post("/create-log", createCappedCollection);
logRouter.post("/add-log", addLog);

export default logRouter;