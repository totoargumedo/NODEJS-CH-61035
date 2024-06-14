import { ProductModel } from "./models/product.model.js";

export default class ProductsDaoMongo {
  async getAll(pagination, page, limit, sort, query) {
    try {
      const filter = query ? query : {};
      // const response = await ProductModel.find({}).limit(limit).lean();
      let sortQuery =
        sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : null;
      const response = await ProductModel.paginate(filter, {
        pagination: pagination,
        page,
        limit,
        sort: sortQuery,
      });
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
