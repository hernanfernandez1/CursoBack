const { Router } = require('express');
const { ProductsController } = require('../controller/productos');
const router = Router();



router.get('/', (req, res) => {
    res.json({
        msg: ProductsController.getAll()
    })
})


router.get('/:id', (req, res) => {

    const id = req.params.id;
    const product = ProductsController.getById(id)
    res.json({
        msg: product
    })

})

router.post('/', (req, res) => {
    const data = ProductsController.save(req.body);
    res.json({
        msg: data
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const pepito = req.body;
    const data = ProductsController.findByIdAndUpdate(id, pepito)
    res.json({
        msg: data
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        msg: ProductsController.findByIdAndDelete(id)
    })
})


module.exports = router;
