const productForm = document.getElementById("productForm");
const inputTitle = document.getElementById("title");
const inputPrice = document.getElementById("price");
const inputImg = document.getElementById("img");
const tbodyProducts = document.getElementById("tableContent");

const chatForm = document.getElementById("chatForm");
const inputEmail = document.getElementById("email");
const messaggesDiv = document.getElementById("chat");
const inputMessage = document.getElementById("message");

const socket = io();

window.addEventListener("load", function (e) {
  socket.emit("newConnection");
});

socket.on("welcome", (data) => {
  alert(data);
});

//Add new prodcut
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newProduct = {
    title: inputTitle.value,
    price: inputPrice.value,
    img: inputImg.value,
  };

  //Emit product to the server
  socket.emit("addProduct", newProduct);

  inputTitle.value = "";
  inputPrice.value = "";
  inputImg.value = "";
});

socket.on("lastProduct", (lastProduct) => {
  AddNewProduct(lastProduct);
});

function AddNewProduct(lastProduct) {

  const cardContent = document.createElement("div");
  cardContent.classList.add('card', 'm-2', 'tarjeta');

  cardContent.innerHTML = `
  <div class="row g-0">
    <div class="col-md-5">
      <img class="img-fluid rounded-start imagen" src= ${lastProduct.img} >
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h5 class="card-title">${lastProduct.title}</h5>
        <p class="card-text">Precio $${lastProduct.price}</p>
      </div>
    </div>
  </div>
  `;

  tbodyProducts.appendChild(cardContent);
}

//Send Message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let message = {
    email: inputEmail.value,
    message: inputMessage.value,
  };

  //Emit message to the server
  socket.emit("sendMesssage", message);

  inputEmail.value = "";
  inputMessage.value = "";
});

socket.on("lastMessage", (lastMessage) => {
  AddNewMessage(lastMessage);
});

function AddNewMessage(lastMessage) {
  const pEmail = document.createElement("p");
  const pTime = document.createElement("p");
  const pMessage = document.createElement("p");
  const finalMessage = document.createElement("p");

  pEmail.classList.add("emailAzulNegrita");
  pTime.classList.add("horaRojo");
  pMessage.classList.add("mensajeVerdeCursiva");

  pEmail.innerText = lastMessage.email;
  pTime.innerText = `[${lastMessage.time}]:`;
  pMessage.innerText = `${lastMessage.message}`;

  finalMessage.appendChild(pEmail);
  finalMessage.appendChild(pTime);
  finalMessage.appendChild(pMessage);

  finalMessage.classList.add("mensajeFinal");

  messaggesDiv.appendChild(finalMessage);
}
