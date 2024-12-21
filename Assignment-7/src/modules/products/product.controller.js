import { Router } from "express";
import { addProduct, deleteProduct, getAllNotSoftDeleted, getMaxPrice, getProductsByIds, getProductsWithUsers, getTopExpensiveProducts, searchProducts, softDelete } from "./product.service.js";
const productRouter = Router();


productRouter.post("/add-product", addProduct);
productRouter.patch("/soft-delete/:id", softDelete);
productRouter.delete("/delete-product/:id", deleteProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/in", getProductsByIds);
productRouter.get("/all-not-soft-deleted", getAllNotSoftDeleted);
productRouter.get("/products-with-users", getProductsWithUsers);
productRouter.get("/max-price", getMaxPrice);
productRouter.get("/top-expensive", getTopExpensiveProducts);


export default productRouter;