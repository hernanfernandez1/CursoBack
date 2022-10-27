const { Router } = require('express');
const { ProductsController } = require('../controller/products');

const router = Router();

router.get('/', async (req, res)=>{
    res.render('form')
 });

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const product = ProductsController.getById(id)
    res.json({
        msg: product
    })
})

router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = {
        title: body.title,
        price: body.price
    };
    
    ProductsController.save(newProduct);
    res.redirect('/');
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { body } = req

    res.json({
        msg: ProductsController.update(id, body)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        msg: ProductsController.delete(id)
    })
})

module.exports = router;