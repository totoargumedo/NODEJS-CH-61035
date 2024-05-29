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
}
