function addQuantity(e) {
  fetch(`/api/carts/665f6756c48b3a7311159c8c/product/${e.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      window.location.href = `/cart/665f6756c48b3a7311159c8c`;
    })
    .catch((error) => console.log(error));
}

function removeQuantity(e) {
  fetch(`/api/carts/665f6756c48b3a7311159c8c/product/${e.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      window.location.href = `/cart/665f6756c48b3a7311159c8c`;
    })
    .catch((error) => console.log(error));
}

function removeProductInCart(e, quantity) {
  fetch(`/api/carts/665f6756c48b3a7311159c8c/product/${e.id}`, {
    method: "DELETE",
    body: JSON.stringify({ quantity: quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      window.location.href = `/cart/665f6756c48b3a7311159c8c`;
    })
    .catch((error) => console.log(error));
}

function clearCart() {
  fetch(`/api/carts/665f6756c48b3a7311159c8c/clean`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      window.location.href = `/cart/665f6756c48b3a7311159c8c`;
    })
    .catch((error) => console.log(error));
}
