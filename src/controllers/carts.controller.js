import * as cartsServices from "../services/carts.services.js";

export const create = async (req, res, next) => {
  try {
    const newCart = await cartsServices.create();
    console.log(newCart);
    return res.status(201).json({ status: "success", data: newCart });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const cartsAll = await cartsServices.getAll();
    return res.status(200).json({ status: "success", data: cartsAll });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartsServices.getById(cid);
    if (cartFound.error) {
      return res.status(404).json({ status: "error", data: cartFound.error });
    }
    return res.status(200).json({ status: "success", data: cartFound });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartDeleted = await cartsServices.remove(cid);
    if (cartDeleted.error) {
      return res.status(404).json({ status: "error", data: cartDeleted.error });
    }
    return res.status(200).json({ status: "success", data: cartDeleted });
  } catch (error) {
    next(error);
  }
};
