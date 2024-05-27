import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
  constructor(filename) {
    this.carts = [];
    this.filename = filename;
    this.path = `./src/managers/fs/data/${filename}.json`;
  }

  //inicializador de archivo
  async read() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
      } else {
        await this.save();
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async save() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      throw new Error(error);
    }
  }

  async newCart() {
    try {
      await this.read();
      const newCart = { id: uuidv4(), products: [] };
      this.carts.push(newCart);
      await this.save();
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //devuelve todos los productos
  async getCarts() {
    try {
      await this.read();
      return this.carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  //devuelve los productos cargados en un carrito por id
  async getCartById(id) {
    try {
      await this.read();
      const cartExists = this.carts.find((cart) => cart.id == id);
      if (!cartExists) {
        return { error: "Not found" };
      }
      return cartExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Agregar o sumar productos a un carrito por id
  async addProductsToCart(cid, pid, quantity = 1) {
    try {
      await this.read();
      //buscar carrito
      const cartExists = this.carts.find((cart) => cart.id === cid);
      if (!cartExists) {
        return { error: "Cart not found" };
      }
      //buscar producto en carrito
      const productExists = cartExists.products.find((prod) => prod.id === pid);
      if (!productExists) {
        cartExists.products.push({ id: pid, quantity: Number(quantity) });
      } else {
        productExists.quantity += Number(quantity);
      }
      await this.save();
      return cartExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Restar cantidad de productos o eliminar productos del carrito
  async removeProductFromCart(cid, pid, quantity = 1) {
    try {
      await this.read();
      //buscar carrito
      const cartExist = this.carts.find((cart) => cart.id === cid);
      if (!cartExist) return { error: "Cart not found" };
      //buscar producto en carrito
      const productExist = cartExist.products.find((prod) => prod.id === pid);
      if (!productExist) return { error: "Product not found in cart" };
      //restar cantidad de productos
      if (productExist.quantity <= quantity) {
        cartExist.products = cartExist.products.filter(
          (prod) => prod.id !== pid
        );
      } else {
        productExist.quantity -= quantity;
      }
      await this.save();
      return cartExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Borrar carrito
  async deleteCart(cid) {
    try {
      await this.read();
      const cartIndex = this.carts.findIndex((cart) => cart.id === cid);
      if (cartIndex === -1) {
        return { error: "Cart not found" };
      }
      this.carts.splice(cartIndex, 1);
      await this.save();
      return { success: "Cart deleted" };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartManager;
