import * as productsServices from "../services/products.services.js";

export const getAll = async (req, res, next) => {
  try {
    //recibe title, code, category como opciones de busqueda, prioriza en ese orden en caso se envie mas de una
    const { page, limit, sort, title, code, category, status } =
      req.query || null;
    const query = title
      ? { title: new RegExp(title, "i") }
      : code
      ? { code: new RegExp(code, "i") }
      : category
      ? { category: new RegExp(category, "i") }
      : status
      ? { status: status }
      : null;
    const productsAll = await productsServices.getAll(
      true,
      page,
      limit,
      sort,
      query
    );
    //En caso de que se realice un request con limite especifico, se agrega a la url de paginacion
    const limitChecked = limit ? `limit=${limit}` : "";
    //Creamos los links de paginacion
    const prevPage = productsAll.hasPrevPage
      ? `http://localhost:8080/api/products?page=${productsAll.prevPage}&${limitChecked}`
      : null;
    const nextPage = productsAll.hasNextPage
      ? `http://localhost:8080/api/products?page=${productsAll.nextPage}&${limitChecked}`
      : null;
    return res.status(200).json({
      status: "success",
      totalPages: productsAll.totalPages,
      page: productsAll.page,
      hasPrevPage: productsAll.hasPrevPage,
      prevPage: productsAll.prevPage,
      prevLink: prevPage,
      hasNextPage: productsAll.hasNextPage,
      nextPage: productsAll.nextPage,
      nextLink: nextPage,
      payload: productsAll.docs,
    });
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
