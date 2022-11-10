import { PORT } from './config/config';
import server from './services/server'

server.listen(PORT, ():void =>{
    console.log(`Server up port: ${PORT}`);
    
})