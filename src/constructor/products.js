class ProductManager {
  #id = 0;

  constructor() {
    this.products = [];
  }

  //metodo para precargar productos
  initExample() {
    this.addProduct({
      title: "Auriculares ASTRO A10 Menta",
      description:
        "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
      price: 52500,
      thumbnail:
        "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1",
      code: "A10M",
      stock: 16,
    });
    this.addProduct({
      title: "Auriculares ASTRO A10 Gris",
      description:
        "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
      price: 54000,
      thumbnail:
        "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1",
      code: "A10G",
      stock: 13,
    });
  }

  //agregar productos, agregar id incremental a cada producto
  addProduct(product) {
    const verifyCode = this.products.find((prod) => prod.code === product.code);
    if (verifyCode) {
      return { error: "Product code already exists" };
    }
    this.#id++;
    const newProduct = { id: this.#id, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  //devuelve todos los productos
  getProducts() {
    return this.products;
  }

  //devuelve un producto por id
  getProductById(id) {
    const productExist = this.products.find((product) => product.id === id);
    if (!productExist) {
      return { error: "Not Found" };
    }
    return productExist;
  }
}

export default ProductManager;
