const express = require('express');
const http = require("http");
const mainRouter = require('../routes/index');
const path = require('path');
const { ProductsController } = require('../controller/products');

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	const products = ProductsController.getAll();
	res.render('index', { products });
})

app.use(express.static('public'));
app.use('/api', mainRouter);

//tener cuidado con las rutas que ejecuten codigo asincrono mas adelante
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		error: message,
	})
});

// Cuando la funcion es asincronica si esta falla hay que pasar el error con next() para que lo atrape el middleware por ej en /routes/products
/*
router.post('/', async (req, res, next) => {
	// const body = req.body;
	const { body }  = req

	try{
		const data = await ProductsController.save(body);
		res.json({
			msg: data
		})
	} catch (err) {
		next(err);
	}
})
*/

module.exports = server;