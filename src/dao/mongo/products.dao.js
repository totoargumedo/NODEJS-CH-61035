import { ProductModel } from "./models/product.model.js";

export default class ProductsDaoMongo {
  async getAll(limit) {
    try {
      const response = await ProductModel.find({}).limit(limit).lean();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id).lean();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(product) {
    try {
      const newProduct = await ProductModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, prod) {
    try {
      const productUpdated = await ProductModel.findByIdAndUpdate(id, prod, {
        new: true,
      });
      return productUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
  async remove(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
