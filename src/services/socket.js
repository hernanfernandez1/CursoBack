const socketIo = require("socket.io");
const path = require("path");
const { ProductsController } = require("../controller/products");
const { formatMessages } = require("../utils/messages");
const messageObj = require("../controller/message");

const MessagesFileFolderPath = path.resolve(__dirname, "../../messages.json");

messageObj.fileName = MessagesFileFolderPath;

const productData = {
  title: undefined,
  price: undefined,
  img: undefined,
};

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
      socket.emit("welcome", "Bienvenido!");
    });

    //Listen for new product
    socket.on("addProduct", (newProduct) => {
      productData.title = newProduct.title;
      productData.price = newProduct.price;
      productData.img = newProduct.img;
      ProductsController.save(productData)
      arrayProduct = ProductsController.getAll();
      io.emit("lastProduct", arrayProduct[arrayProduct.length - 1]);
    });

    //Listen for chat messages
    socket.on("sendMesssage", async (message) => {
      io.emit("lastMessage", formatMessages(message));

      try {
        let exist = await messageObj.validateExistFile();
        if (exist) {
          console.log("El archivo ya existe!");
        }
        await messageObj.saveMessage(formatMessages(message));
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};
