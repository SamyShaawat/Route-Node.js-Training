import { Router } from "express";
import { createDatabaseTables } from './db.service.js';

const dbRouter = Router();

dbRouter.post('/create-tables', createDatabaseTables);

export default dbRouter;