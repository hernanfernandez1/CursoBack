const express = require('express')
const app = express();
const mainRouter = require('../routes/index');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',mainRouter);

app.get('/', (req, res) =>{
    res.json({
        msg: 'ok app'
    })
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error:message,
    })

});

    





module.exports = app;