import { Response, Request, NextFunction } from "express";
import { logger } from "../config/logs.config";
import { cartService } from "../services/cart.service";
import { cartDao } from "../DB/mongoDB/daos/cart.dao";

export const createCart = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_cart = await cartService.createCart()
        res.status(200).json({
            msg: `Id del carrito: ${id_cart}`
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}
export const deleteCartById = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        await cartService.deleteCartById(id_params)
        res.status(200).json({
            msg: `Carrito eliminado exitosamente`
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}
export const getProductsByIdCart = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        const dataJson = await cartService.productsByCartId(id_params)
        if(dataJson === undefined || dataJson === null){
            return res.status(404).json({
                msg: 'No se encontró el carrito por el id indicado'
            })
        }
        res.status(200).json({
            dataJson
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}
export const buyCart = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        const cart = await cartDao.findCartByID(id_params)
        const check = await cartService.buyCart(id_params)
        if(!cart){
            return res.status(404).json({
                msg: 'No se encontró el carrito'
            })
        }
        res.status(200).json({
            msg: 'Compra aceptada',
            orderGenerated: check
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}
export const addProductToCart = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        const { id } = req.body
        const response = await cartService.addProductToCart(id_params, id)

        if(!response){
            return res.status(404).json({
                msg: 'Carrito o producto no encontrado'
            })
        }
        res.status(200).json({
            msg: `Producto agregado al carrito con éxito, puede verificarlo por este id:${id_params}`
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}
export const deleteProductToCart = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_cart: string = req.params.id
        const id_product: string = req.params.id_prod
        const response = await cartService.deleteProductToCart(id_cart, id_product)
        if(!response){
            return res.status(404).json({
                msg: 'Carrito o producto no encontrado'
            })
        }
        res.status(200).json({
            msg: `Producto eliminado con éxito del carrito, puede consultar por este id: ${id_cart}`,
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}