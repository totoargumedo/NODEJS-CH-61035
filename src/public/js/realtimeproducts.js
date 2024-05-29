const socket = io();

//Renderiza los productos en pantalla
socket.on("productsAll", (data) => {
  renderProducts(data);
});

function renderProducts(products) {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  products.reverse();
  products.forEach((product) => {
    let newRow = document.createElement("tr");
    let statusColor;
    let statusText;
    if (product.status) {
      statusColor = "success";
      statusText = "Disponible";
    } else {
      statusColor = "danger";
      statusText = "No disponible";
    }
    newRow.innerHTML = `
              <th scope="row">${product._id || product.id}</th>
              <td><img
                    class="rounded object-fit-cover"
                    src="${product.thumbnails[0]}"
                    alt="${product.title}"
                    style="height: 50px;width:50px;"
                  /></td>
              <td>${product.title}</td>
              <td>${product.description}</td>
              <td>${product.code}</td>
              <td class="text-primary"><strong>$${product.price}</strong></td>
              <td class="text-${statusColor}">${statusText}</td>
              <td>${product.category}</td>
              <td><strong>${product.stock}</strong></td>
              <td><button class="btn" id=${product._id || product.id} name=${
      product.title
    } onclick="deleteProduct(this);">❌</button></td>`;
    table.appendChild(newRow);
  });
}

//Aviso de producto nuevo
socket.on("newProductToast", (data) => {
  Toastify({
    text: `¡Producto nuevo! 
    ${data.title}
    ${data.code}
    ${data.price}`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(105,105,115,1) 100%, rgba(0,18,22,1) 100%)",
    },
    onClick: function () {},
  }).showToast();
});

//Aviso de producto eliminado
socket.on("productDeletedToast", (data) => {
  Toastify({
    text: `¡Producto ${data} eliminado!`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(90deg, rgba(138,14,46,1) 0%, rgba(168,5,30,1) 100%, rgba(0,18,22,1) 100%)",
    },
    onClick: function () {},
  }).showToast();
});

//Gestiona para mas de una imagen
let thumbnailsCount = 1;
const imagesInput = document.getElementById("productImages");
function addImageInput() {
  thumbnailsCount++;
  let newInput = document.createElement("div");
  newInput.classList = "input-group py-2";
  newInput.innerHTML = `
      <input type="text" class="form-control" id="thumbnails${thumbnailsCount}" id="thumbnails">
      <button type="button" class="btn btn-success" onclick="addImageInput()">+</button>
    `;
  imagesInput.appendChild(newInput);
}
function resetImageInput() {
  thumbnailsCount = 1;
  imagesInput.innerHTML = `
  <label
        for="thumbnails1"
        class="form-label text-secondary text-secondary"
      >Imagenes</label>
      <div class="form-text">Puedes ingresar mas imagenes presionando el +</div>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          id="thumbnails1"
        />
        <button
          type="button"
          class="btn btn-success"
          onclick="addImageInput()"
        >+</button>
      </div>
  `;
}

//Envia los datos del formulario al servidor
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").valueAsNumber;
  const stock = document.getElementById("stock").valueAsNumber;
  const category = document.getElementById("category").value;
  const thumbnails = [];
  for (let i = 0; i < thumbnailsCount; i++) {
    let thumbnail = document.getElementById(`thumbnails${i + 1}`).value;
    thumbnails.push(thumbnail);
  }
  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };
  await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === "success") {
        resetImageInput();
        productForm.reset();
        productForm.elements.title.focus();
        socket.emit("newProduct", { title, price, code });
      } else {
        Swal.fire(`${res.data}`, "", "error");
      }
    })
    .catch((error) => console.log(error));
});

//Borrar producto
function deleteProduct(element) {
  Swal.fire({
    title: "¿Confirmas que deseas borrar este producto?",
    showDenyButton: true,
    confirmButtonText: "Borrar",
    denyButtonText: `No borrar`,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/api/products/${element._id || element.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === "error") {
            Swal.fire("Ocurrio un error", "", "error");
          } else {
            Swal.fire("Producto eliminado", "", "success");
            socket.emit("productDeleted", element.name);
          }
        })
        .catch((error) => console.log(error));
    }
  });
}
