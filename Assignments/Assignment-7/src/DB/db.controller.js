import { Router } from "express";
import { createProductsTable, createTables, createUserPhones, createUsersProducts, createUsersTable } from './db.service.js';

const dbRouter = Router();

dbRouter.post('/create-users-table', createUsersTable);
dbRouter.post('/create-products-table', createProductsTable);
dbRouter.post('/create-user-phones', createUserPhones);
dbRouter.post('/create-users-products', createUsersProducts);
dbRouter.post('/create-tables', createTables);

export default dbRouter;