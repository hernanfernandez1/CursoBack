import { Router, Request, Response, NextFunction } from "express";
import { auth } from "../config/config";
import filesManager from "../controller/files";
import productManager from "../controller/products";
import { ProductsType } from "../utils/globals";


const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: [ProductsType] = await filesManager.readFile('products')

        res.json({
            data
        })
    } catch (error) {
        next(error)
    }
})
productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id
        const data = await productManager.getById(idParams)

        res.json({
            data
        })
    } catch (error) {
        next(error)
    }
})
productsRouter.post('/', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        if (!filesManager.validationBodySave(data)) {
            res.status(400).json({
                msg: 'Datos invalidos'
            })
        } else {
            await productManager.save(data)
            res.json({
                msg: 'El producto se agrego correctamente'
            })
        }
    } catch (error) {
        next(error)
    }
})
productsRouter.put('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id
        const data = req.body
        if (!filesManager.validationBodyUpdate(data)) {
            res.status(400).json({
                msg: 'Datos invalidos'
            })
        } else {

            await productManager.update(idParams, data)

            res.json({
                msg: ` El producto con id ${idParams} se modificó correctamente`
            })
        }
    } catch (error) {
        next(error)
    }
})
productsRouter.delete('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id

        await productManager.delete(idParams)

        res.json({
            msg: `El producto con id: ${idParams} Se eliminó correctamente `
        })
    } catch (error) {
        next(error)
    }
})

export default productsRouter