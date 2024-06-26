import { Router } from "express";
import * as productsServices from "../../services/products.services.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const { page, limit, sort, title } = req.query || null;
    const query = title ? { title: new RegExp(title, "i") } : null;
    const productsAll = await productsServices.getAll(
      true,
      page,
      limit,
      sort,
      query
    );
    const renderPagination = productsAll.totalPages > 1 ? true : false;
    const totalPages = [];
    if (renderPagination) {
      for (let i = 1; i <= productsAll.totalPages; i++) {
        totalPages.push(i);
      }
    }
    const prevPageLink = productsAll.hasPrevPage
      ? `http://localhost:8080/products?page=${productsAll.prevPage}`
      : null;
    const nextPageLink = productsAll.hasNextPage
      ? `http://localhost:8080/products?page=${productsAll.nextPage}`
      : null;
    res.render("products", {
      products: productsAll.docs,
      renderPagination: renderPagination,
      page: page,
      totalPages: totalPages,
      hasPrevPage: productsAll.hasPrevPage,
      hasNextPage: productsAll.hasNextPage,
      prevPageLink: prevPageLink,
      nextPageLink: nextPageLink,
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/realtimeproducts", async (req, res, next) => {
  try {
    res.render("realtimeproducts", {
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productOne = await productsServices.getById(pid);
    res.render("product", { productOne, user: req.session.user });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
