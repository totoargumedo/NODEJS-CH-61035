import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongo {
  async create() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const carts = await CartModel.find().lean();
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const cart = await CartModel.findById(id).lean();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id) {
    try {
      const cart = await CartModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductsToCart(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        return { error: "Cart not found" };
      }
      const productInCart = cart.products.find(
        (prod) => prod.product_id == pid
      );
      if (!productInCart) {
        cart.products.push({ product_id: pid, quantity: Number(quantity) });
      } else {
        productInCart.quantity += Number(quantity);
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductsInCart(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        return { error: "Cart not found" };
      }
      const productInCart = cart.products.find(
        (prod) => prod.product_id == pid
      );
      if (!productInCart) {
        return { error: "Product not found in cart" };
      }
      let quantityInCart;
      if (productInCart.quantity <= Number(quantity)) {
        //guardo la cantidad de productos que habia en el carrito ya que borro todo
        quantityInCart = Number(productInCart.quantity);
        cart.products = cart.products.filter((prod) => prod.product_id != pid);
      } else {
        //guardo solo la cantidad que se resta
        quantityInCart = Number(quantity);
        productInCart.quantity -= Number(quantity);
      }
      await cart.save();
      return { cart, quantityInCart };
    } catch (error) {
      throw new Error(error);
    }
  }
}
