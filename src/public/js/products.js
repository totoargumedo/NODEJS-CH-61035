function addProductToCart(element) {
  fetch(`/api/carts/665f6756c48b3a7311159c8c/product/${element.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === "error") {
        Swal.fire("Ocurrio un error", "", "error");
      } else {
        Toastify({
          text: `¡Agregado al carrito!`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background:
              "radial-gradient(circle, rgba(23,138,14,1) 0%, rgba(26,129,39,1) 15%, rgba(27,126,48,1) 38%, rgba(47,168,5,1) 100%)",
          },
          onClick: function () {},
        }).showToast();
      }
    })
    .catch((error) => console.log(error));
}
