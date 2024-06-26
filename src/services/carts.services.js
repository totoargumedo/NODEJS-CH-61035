/*PRODUCTS DAOS*/
// import ProductDaoFS from "../dao/fs/products.dao.js";
// const productsDao = new ProductDaoFS("products");
import ProductsDaoMongo from "../dao/mongo/products.dao.js";
const productsDao = new ProductsDaoMongo();
/*CARTS DAOS*/
// import CartDaoFS from "../dao/fs/carts.dao.js";
// const cartsDao = new CartDaoFS("carts");
import CartDaoMongo from "../dao/mongo/carts.dao.js";
const cartsDao = new CartDaoMongo();

/*SERVICES*/
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

export const getById = async (cid) => {
  try {
    return await cartsDao.getById(cid);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (cid) => {
  try {
    return await cartsDao.remove(cid);
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductsToCart = async (cid, pid, quantity = 1) => {
  try {
    //revisamos que exista el producto
    const productExists = await productsDao.getById(pid);
    if (!productExists) {
      return productExists;
    }
    //si no hay stock suficiente, devolvemos error
    if (productExists.stock < quantity) {
      return { error: "Not enough stock" };
    }
    const cartUpdated = await cartsDao.addProductsToCart(cid, pid, quantity);
    // Si devuelve error por no encontrarlo o lo que sea, lo devuelvo
    if (!cartUpdated) {
      return cartUpdated;
    }
    //caso contrario modifico el stock del producto y devuelvo el carrito
    const newStock = productExists.stock - quantity;
    const productUpdated = await productsDao.update(pid, { stock: newStock });
    if (!productUpdated) {
      return productUpdated;
    }
    return cartUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

export const addManyProductsToCart = async (cid, products) => {
  try {
    //revisamos que existan los productos y tengan el stock suficiente
    const productsAll = await productsDao.getAll();
    const productError = {};
    const productsExists = products.forEach((prod) => {
      const product = productsAll.docs.find((p) => p._id == prod.product_id);
      if (!product) {
        productError.error = "Product not found or not enough stock";
        return false;
      }
      if (product.stock < prod.quantity) {
        productError.error = "Not enough stock";
        return false;
      }
    });
    if (!productsExists) {
      return productError;
    }
    //Agregamos los productos al carrito
    const cartUpdated = await cartsDao.addManyProductsToCart(cid, products);
    // Si devuelve error por no encontrarlo o lo que sea, lo devuelvo
    if (!cartUpdated) {
      return cartUpdated;
    }
    //caso contrario modifico el stock del producto y devuelvo el carrito
    const productsUpdated = await products.forEach((prod) => {
      const updated = productsDao.update(prod.product_id, {
        $inc: { stock: -prod.quantity },
      });
      if (!updated) {
        return updated;
      }
    });
    return cartUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeProductsInCart = async (cid, pid, quantity = 1) => {
  try {
    //revisamos que exista el producto
    const productExists = await productsDao.getById(pid);
    if (!productExists) {
      return productExists;
    }
    const cartUpdated = await cartsDao.removeProductsInCart(cid, pid, quantity);
    // Si devuelve error por no encontrarlo o lo que sea, lo devuelvo
    if (cartUpdated.error || !cartUpdated) {
      return cartUpdated;
    }
    //caso contrario modifico el stock del producto y devuelvo el carrito
    const newStock = productExists.stock + cartUpdated.quantityInCart;
    const productUpdated = await productsDao.update(pid, { stock: newStock });
    if (productUpdated.error || !productUpdated) {
      return productUpdated;
    }
    return cartUpdated.cart;
  } catch (error) {
    throw new Error(error);
  }
};
export const cleanCart = async (cid) => {
  try {
    const cart = await cartsDao.cleanCart(cid);
    if (!cart) return cart;
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};
