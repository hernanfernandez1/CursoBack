const { Router } = require('express');
const ProductsRouter = require('./products');

const router = Router();
router.use('/products', ProductsRouter);
module.exports = router;