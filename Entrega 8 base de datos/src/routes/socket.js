import moment from 'moment'
import { Server } from "socket.io"
import { mySqlDb } from "../controller/mySqlDb.js"
import { sqLiteDb } from "../controller/sqLiteDb.js"

const initWsServer = (server) =>{
    const io = new Server(server)

    io.on('connection', (socket) =>{
        console.log('New connection established')
        
        socket.on('addProduct', async (product) =>{
            try{
                const newProduct = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                };

                await mySqlDb.insertData(newProduct)
                const dataJson = await mySqlDb.getAll()
                io.emit('addTable', dataJson[dataJson.length-1])
            }catch (error){
                console.log(error)
            }
        })
        socket.on('newMessage', async (message) =>{
            try{
                const newMessage  = {
                    email: message.email,
                    msg: message.msg,
                    time: moment().format('h:mm a')
                }
                await sqLiteDb.insertData(newMessage)
                const messageJson = await sqLiteDb.getAll()
                io.emit('renderMessage', messageJson[messageJson.length-1])    
            }catch(error){
                console.log(error)
            }
        })
    })
    return io
}
export default initWsServer