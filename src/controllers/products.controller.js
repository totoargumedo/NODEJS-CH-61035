import * as productsServices from "../services/products.services.js";

export const getAll = async (req, res, next) => {
  try {
    const { limit } = req.query || null;
    console.log(limit);
    const productsAll = await productsServices.getAll(limit);
    return res.status(200).json({ status: "success", data: productsAll });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productFound = await productsServices.getById(pid);

    if (productFound.error) {
      return res
        .status(404)
        .json({ status: "error", data: productFound.error });
    }
    return res.status(200).json({ status: "success", data: productFound });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await productsServices.create(body);
    if (newProduct.error) {
      return res.status(400).json({ status: "error", data: newProduct.error });
    }
    return res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { body } = req;

    const productUpdated = await productsServices.update(pid, body);
    if (productUpdated.error) {
      return res
        .status(400)
        .json({ status: "error", data: productUpdated.error });
    }
    return res.status(200).json({ status: "success", data: productUpdated });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productDeleted = await productsServices.remove(pid);
    console.log(productDeleted);
    if (productDeleted.error) {
      return res
        .status(404)
        .json({ status: "error", data: productDeleted.error });
    }
    return res.status(200).json({ status: "success", data: productDeleted });
  } catch (error) {
    next(error);
  }
};
