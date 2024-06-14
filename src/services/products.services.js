// import ProductDaoFS from "../dao/fs/products.dao.js";
// const productsDao = new ProductDaoFS("products");

import ProductsDaoMongo from "../dao/mongo/products.dao.js";
const productsDao = new ProductsDaoMongo();

export const getAll = async (pagination, page, limit, sort, query) => {
  try {
    return await productsDao.getAll(pagination, page, limit, sort, query);
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await productsDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (prod) => {
  try {
    return await productsDao.create(prod);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, prod) => {
  try {
    return await productsDao.update(id, prod);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await productsDao.remove(id);
  } catch (error) {
    throw new Error(error);
  }
};
