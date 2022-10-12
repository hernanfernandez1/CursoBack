const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
class Contenedor {

    constructor(nameFile) {
        this.nameFile = nameFile;
    }

    getAll = async () => {

        await validateFile();
        const data = await fs.promises.readFile(contenedor.nameFile, 'utf-8');
        return JSON.parse(data);

    }

    getById = async (idBuscado) => {

        const productos = await this.getAll();

        const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado);

        if (indice < 0) {
            return "No hay productos con el id 2";
        }

        return productos[indice];
    }

    save = async (product) => {

        if (!product.title || !product.price || typeof product.title !== 'string' || typeof product.price !== 'number') throw new Error('Datos invalidos');

        const products = await this.getAll();

        let id = "1";

        if (products.length) {
            id = products[products.length - 1].id + 1
        }

        const newProducto = {
            title: product.title,
            price: product.price,
            id: id
        }

        products.push(newProducto);

        await saveProducts(products);
    }

    deleteById = async (idBuscado) => {

        await validateFile();
        const products = await this.getAll();

        const indice = products.findIndex((unProducto) => unProducto.id === idBuscado);

        if (indice < 0) {
            return console.log("No se pudo eliminar el producto con el id: " + idBuscado);;
        }

        products.splice(indice, 1);

        await saveProducts(products);

        console.log("\n===Eliminación de un producto con id " + idBuscado + "===");
        return console.log(products);
    }

    deleteAll = async () => {

        await validateFile();
        console.log("\n===Eliminación de todos los productos===");
        await saveProducts([]);
        const result = await this.getAll()
        return console.log(result);
    }
}


const contenedor = new Contenedor(
    'productos.json'
);

const validateFile = async () => {
    try {
        await fs.promises.stat(contenedor.nameFile)
    } catch (err) {
        await fs.promises.writeFile(contenedor.nameFile, JSON.stringify([]));
    }
}

const saveProducts = async (products) => {

    const data = JSON.stringify(products, null, '\t');
    await fs.promises.writeFile(contenedor.nameFile, data);
}

const main = async () => {

    console.log("===Información de todos los productos===");
    const resultAll = await contenedor.getAll();
    console.log(resultAll);

    console.log("\n===Información de un solo producto con el id 2===");
    const resultId = await contenedor.getById(2);
    console.log(resultId);

    console.log("\n===Guardado de un nuevo producto y luego muestro la lista nueva===");
    const newProduct = { title: 'Póster', price: 80, };
    await contenedor.save(newProduct);
    const newResult = await contenedor.getAll();
    console.log(newResult);

    contenedor.deleteById(3);

    setTimeout(() => {
        contenedor.deleteAll();
    }, 1000);
}

/* main(); */
app.get('/', (req, res) => {
    res.send(
        ` <h1 style="text-align:center">Bienvenido al servidor de Hernán Fernández</h1>
    <h3 style="text-align:center">Para ver mas contenido "/productos" y un producto al azar "/productoRandom"</h3>`
    )
});

app.get('/productos', async (req, res) => {
    const products = await contenedor.getAll()
    const showProducts = products.map((product) => {
        return `Producto: ${ product.title } - Precio: ${ product.price } - ID: ${ product.id }`
    })
    res.send(showProducts)
});

const idRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get('/productoRandom', async (req, res) => {
    const id = idRandom(1, 3);
    const product = await contenedor.getById(id);
    const showProduct = `Producto: ${ product.title } - Precio: ${ product.price } - ID: ${ product.id }`;
    res.send(showProduct);
});