import { Router } from "express";
import { addProductToCart, buyCart, createCart, deleteCartById, deleteProductToCart, getProductsByIdCart } from "../controllers/cart.controller";
import { isLoggedIn } from "../middleware/auth.middleware";

const cartRouter = Router()

cartRouter.post('/', createCart)
cartRouter.delete('/:id', deleteCartById)
cartRouter.get('/:id/products', getProductsByIdCart)
cartRouter.get('/:id/buy', isLoggedIn, buyCart)
cartRouter.post('/:id/products', addProductToCart)
cartRouter.delete('/:id/products/:id_prod', deleteProductToCart)

export default cartRouter