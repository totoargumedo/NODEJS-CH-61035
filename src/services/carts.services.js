// import CartDaoFS from "../dao/fs/carts.dao.js";
// const cartsDao = new CartDaoFS("carts");

import CartDaoMongo from "../dao/mongo/carts.dao.js";
const cartsDao = new CartDaoMongo();

export const create = () => {
  try {
    return cartsDao.create();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAll = async () => {
  try {
    return await cartsDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await cartsDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await cartsDao.remove(id);
  } catch (error) {
    throw new Error(error);
  }
};
