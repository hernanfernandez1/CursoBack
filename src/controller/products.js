const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductsAPI {
    constructor() {
        this.productos = [
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
    exists(id) {
        const indice = this.productos.findIndex(aPoduct => aPoduct.id == id)

        /* if (indice < 0) {

            
            return false;

        } else {
          
            return true;
        } */
        return indice >= 0;
    }

    validateBody(data) {
		if(!data.title || !data.price || typeof data.title !== 'string' ) throw createError(400,'Datos invalidos');
	}

    getAll() {

        return this.productos;
    }

    getById(id) {
        const exist = this.exists(id);

        if (!exist) throw createError (404 , 'El producto no existe');

        const indice = this.productos.findIndex(aPoduct => aPoduct.id == id)
        return this.productos [indice];
    }


save(data) {
		this.validateBody(data);

		const nuevoProducto = {
			title: data.title,
			price: parseInt(data.price),
			id: uuidv4(),
		}

		this.productos.push(nuevoProducto);
		return nuevoProducto;
	}
    
   /*  save() {

        return 'guarda el producto';
    }
    */
   /*  findByIdAndUpdate() {

       /*  return 'encuentra by id y actualiza producto'; */
   /*  } */ 

   
   findByIdAndUpdate(id, datanueva) {
    const exist = this.exists(id);

    if(!exist) throw createError(404, 'El producto no existe');

    this.validateBody(datanueva);

    const indice = this.productos.findIndex(aProduct =>  aProduct.id == id)

    const oldProduct =  this.productos[indice];

    const nuevoProducto = {
        id: oldProduct.id,
        title: datanueva.title,
        price: datanueva.price,
    }

    this.productos.splice(indice, 1, nuevoProducto);

    return nuevoProducto;
}

  /*   findByIdAndDelete() {

        return 'encuentra by id y elimina producto';
    } */

    findByIdAndDelete(id) {
		const exist = this.exists(id);
		if(!exist) return;

		const indice = this.productos.findIndex(aProduct =>  aProduct.id == id)

		this.productos.splice(indice, 1);
	}

}

const instanciaProductsApi = new ProductsAPI();

module.exports = {

    ProductsController : instanciaProductsApi
}