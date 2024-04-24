import fs from "fs";

class ProductManager {
  #id = 0;

  constructor(filename) {
    this.products = [];
    this.filename = filename;
    this.path = `./src/fs/data/${filename}.json`;
    this.initialize();
  }

  //inicializador de archivo
  async initialize() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
        this.#id = this.getMaxId();
        console.log(`File ${this.filename} loaded`);
      } else {
        await this.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }

  //obtener el id mas alto de los elementos almacenados
  getMaxId() {
    const maxId = this.products.reduce(
      (acc, prod) => (prod.id > acc ? prod.id : acc),
      0
    );
    return maxId;
  }

  //agregar productos, agregar id incremental a cada producto
  async addProduct(product) {
    try {
      const verifyCode = this.products.find(
        (prod) => prod.code === product.code
      );
      if (verifyCode) {
        return { error: "Product code already exists" };
      }
      this.#id++;
      const newProduct = { id: this.#id, ...product };
      this.products.push(newProduct);
      await this.save();
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  //devuelve todos los productos
  getProducts() {
    return this.products;
  }

  //devuelve un producto por id
  getProductById(id) {
    const productExist = this.products.find((product) => product.id == id);
    if (!productExist) {
      return { error: "Not found" };
    }
    return productExist;
  }

  //actualizar campo en producto
  async updateProduct(id, product) {
    try {
      const index = this.products.findIndex((product) => product.id == id);
      if (index === -1) {
        return { error: "Not found" };
      }
      this.products[index] = { id, ...this.products[index], ...product };
      await this.save();
      return this.products[index];
    } catch (error) {
      console.log(error);
    }
  }

  //eliminar producto por id
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex((product) => product.id == id);
      if (index === -1) {
        return { error: "Not found" };
      }
      this.products.splice(index, 1);
      await this.save();
      return { success: "Product deleted" };
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
