import { Router } from "express";
import productsRouter from "./products";
import cartRouter from "./cart";

const mainRouter:Router = Router()

mainRouter.use('/products', productsRouter)
mainRouter.use('/cart', cartRouter)


export default mainRouter