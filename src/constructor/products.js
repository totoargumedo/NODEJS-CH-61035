class ProductManager {
  #id = 0;

  constructor() {
    this.products = [];
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
