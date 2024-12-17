import { Router } from "express";
import { getProducts } from "./product.service.js";
const productRouter = Router();


productRouter.get("/", getProducts)



export default productRouter;