import filesManager from "./files";
import { ProductsType } from '../utils/globals'
import { v4 as uuidv4 } from 'uuid'
import createError from 'http-errors'

class Products {
    constructor() {
    }

    async getById(id: string) {

        const dataJson: [] = await filesManager.readFile('products')
        const index: number = dataJson.findIndex((itemId: ProductsType) => itemId.id === id)

        if (index < 0) {
            throw new Error('El producto no existe');
        }

        return dataJson[index]
    }

    async save(data: ProductsType) {
        
        try {
            const dataJson: [ProductsType] = await filesManager.readFile('products');
            const newProduct: ProductsType = {
                id: uuidv4(),
                timestamp: new Date().toLocaleString(),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: data.precio,
                stock: data.precio
            }

            dataJson.push(newProduct)

            await filesManager.saveFile(dataJson, 'products')
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: string) {

        const dataJson: [ProductsType] = await filesManager.readFile('products')
        const index: number = dataJson.findIndex((itemId: ProductsType) => itemId.id === id)
        if (index < 0) {
            throw new Error('El producto no existe');
        }
        dataJson.splice(index, 1)
        await filesManager.saveFile(dataJson, 'products')

    }

    async update(id: string, data: ProductsType) {

        const dataJson: [ProductsType] = await filesManager.readFile('products')
        const index: number = dataJson.findIndex((itemId: ProductsType) => itemId.id === id)

        if (index < 0) {
            throw new Error('El producto no existe');
        }

        let oldProduct = dataJson[index];
        dataJson[index] = {
            id,
            timestamp: new Date().toLocaleString(),
            nombre: data.nombre ? data.nombre : oldProduct.nombre,
            descripcion: data.descripcion ? data.descripcion : oldProduct.descripcion,
            codigo: data.codigo ? data.codigo : oldProduct.codigo,
            foto: data.foto ? data.foto : oldProduct.foto,
            precio: data.precio ? data.precio : oldProduct.precio,
            stock: data.stock ? data.stock : oldProduct.stock
        }
        await filesManager.saveFile(dataJson, 'products')

    }


}

const productManager = new Products()

export default productManager