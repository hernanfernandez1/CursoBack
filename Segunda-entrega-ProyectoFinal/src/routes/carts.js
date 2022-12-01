import { Router } from "express";
const router = Router();
import {
  getProductsInCart,
  createCart,
  addProductsToCart,
  deleteCartById,
  deleteProductInCartById,
} from "../controllers/cart.js";
import { body } from "express-validator";

router.get("/:id/products", getProductsInCart);
router.post("/", createCart);
router.post("/:id/products",
  body("id").not().isEmpty(),
  addProductsToCart
);
router.delete("/:id", deleteCartById);
router.delete("/:id/products/:id_prod", deleteProductInCartById);

export default router;
