const Server = require('./services/server')

const puerto = 8080;

Server.listen(puerto, () => {
    console.log(`Servidor escuchando ${puerto}`);
})