import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logs.config";
import { productService } from "../services/products.service";
import validationInput from "../utils/validation.utils";


export const getAllProducts = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const products = await productService.getAllProducts()
        res.status(200).json({
            products
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}

export const getProductsByID = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        const dataJson = await productService.getProductById(id_params)
        if(dataJson === undefined || dataJson === null){
            return res.status(404).json({
                msg: 'No se encontró el producto por el id indicado'
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

export const createProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { body } = req
        if(!validationInput.validationBody(body)){
            res.status(400).json({
                msg: 'Ocurrio un error al crear el producto, revise los datos'
            })
        }else{
            await productService.saveProduct(body)
            res.status(200).json({
                msg: 'Producto agregado con éxito'
            })
        }
    }catch(error){
        logger.error(error)
        next(error)
    }
}

export const upgradeProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        const { body } = req
        if(!validationInput.validationBody(body)){
            res.status(400).json({
                msg: 'Ocurrio un error al actualizar el producto, revise los datos'
            })
        }else{
            await productService.upgradeProduct(id_params, body)
            res.status(200).json({
                msg: `Producto modificado con éxito`
            })
        }
    }catch(error){
        logger.error(error)
        next(error)
    }
}

export const DeleteProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const id_params: string = req.params.id
        await productService.deleteProduct(id_params)
        res.status(200).json({
            msg: `Producto eliminado con éxito`
        })
    }catch(error){
        logger.error(error)
        next(error)
    }
}