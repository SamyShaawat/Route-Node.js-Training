import { Router } from "express";
import { addLog } from "./log.service.js";
const logRouter = Router();




logRouter.post("/add-log", addLog);

export default logRouter;