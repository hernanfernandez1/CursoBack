const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors')

class ProductsAPI {
	constructor() {
		this.products = [
			{
				id: uuidv4(), title: 'Remera', price: 200, img: "https://i.postimg.cc/ydh00Y3g/e2f29b1c13eda9f0fe4958e22d50ab92.jpg"
			},
			{
				id: uuidv4(), title: 'Pantalón', price: 250, img: "https://i.postimg.cc/zvn2br80/pantalon-jeans-talle-48.png"
			},

			{
				id: uuidv4(), title: 'Gorra', price: 100, img: "https://i.postimg.cc/8zyKrwgQ/download.jpg"
			}
			
		];
	}

	findId(id) {
		const result = this.products.findIndex(product => product.id == id);
		if (result === -1) throw createError(404, 'Producto no encontrado');

	}

	validateBody(data) {
		if (typeof data.title === 'number' || data.price <= 0) throw createError(400, 'Datos invalidos');
	}

	getAll() {
		return this.products;
	}

	getById(id) {
		this.findId(id);
		const index = this.products.findIndex(product => product.id == id)

		return this.products[index];
	}

	save(data) {
		this.validateBody(data);
		const newProduct = {
			id: uuidv4(),
			title: data.title,
			price: parseInt(data.price),
			img: data.img
		}
		this.products.push(newProduct);

		return newProduct;
	}

	update(id, data) {
		this.findId(id);
		this.validateBody(data);

		const index = this.products.findIndex(product => product.id == id)

		const oldProduct = this.products[index];

		let newProduct;

		if (data.price === undefined || data.price == null || data.price <= 0) {
			newProduct = {
				id: oldProduct.id,
				title: data.title,
				price: oldProduct.price,
			}

		} else if (data.title === "" || data.title === undefined || data.title == null || data.title <= 0) {
			newProduct = {
				id: oldProduct.id,
				title: oldProduct.title,
				price: data.price,
			}

		} else {
			newProduct = {
				id: oldProduct.id,
				title: data.title,
				price: data.price,
			}
		}

		this.products.splice(index, 1, newProduct);

		return newProduct;
	}

	delete(id) {
		this.findId(id);
		const index = this.products.findIndex(product => product.id == id)
		this.products.splice(index, 1);

		return `Producto con id:${id} eliminado`;
	}

}

const instanciaProductsApi = new ProductsAPI();

module.exports = {
	ProductsController: instanciaProductsApi
}