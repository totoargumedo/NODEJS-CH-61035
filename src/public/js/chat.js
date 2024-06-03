const socket = io();

//solicitar usuario
let username = null;

if (!username) {
  Swal.fire({
    title: "Bienvenido/a al chat!",
    input: "Ingresa tu nombre de usuario:",
    input: "email",
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar un nombre de usuario!";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}
//renderizar mensajes
socket.on("messages", (messages) => {
  renderMessages(messages);
});

//avisar de usuario nuevo
socket.on("newUser", (username) => {
  Toastify({
    text: `${username} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});

//renderizar mensajes
const renderMessages = (messages) => {
  if (messages.length === 0) {
    messagesTable.innerHTML = `<div class="d-flex flex-column p-5 justify-content-center"
          <p class="text-light">No hay mensajes</p>
        </div>`;
  } else {
    const html = messages
      .map((message) => {
        return `
      <div class="d-flex flex-column p-3">
          <p class="text-light">${message.user}</p>
          <div class="chat ml-2 p-3">${message.message}</div>
        </div>
    `;
      })
      .join(" ");
    messagesTable.innerHTML = html;
  }
};

//capturar usuario
const messagesTable = document.getElementById("messagesTable");
const inputMessage = document.getElementById("inputMessage");
const inputUser = document.getElementById("inputUser");
let user = null;

inputMessage.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    //enviar mensaje

    const message = inputMessage.value.trim("/n");
    const newMessage = {
      user: username,
      message: message,
    };
    socket.emit("newMessage", newMessage);
    inputMessage.value = "";
    inputMessage.focus();
  }
});
