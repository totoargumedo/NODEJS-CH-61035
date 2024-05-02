import ProductManager from "./fs/products.js";

const productExample1 = {
  title: "Auriculares ASTRO A30 Inalámbricos Blanco",
  description:
    "Auriculares inalámbricos para gaming LIGHTSPEED para Xbox, PlayStation, PC / MAC y dispositivos móviles",
  price: 75000,
  thumbnail:
    "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a30/pdp-gallery-a30-white-01.png?v=1",
  code: "A30WB",
  stock: 13,
};
const productExample2 = {
  title: "Auriculares ASTRO A30 Inalámbricos Negro",
  description:
    "Auriculares inalámbricos para gaming LIGHTSPEED para Xbox, PlayStation, PC / MAC y dispositivos móviles",
  price: 74000,
  thumbnail:
    "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a30/pdp-gallery-a30-navy-01.png?v=1",
  code: "A30WN",
  stock: 13,
};

const productExample3 = {
  title: "Auriculares ASTRO A10 Gris",
  description:
    "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
  price: 54000,
  thumbnail:
    "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1",
  code: "A10G",
  stock: 13,
};

const productExample4 = {
  title: "Auriculares ASTRO A10 Lila",
  description:
    "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
  price: 53000,
  thumbnail:
    "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1",
  code: "A10L",
  stock: 12,
};

const products = new ProductManager("products");

async function test() {
  try {
    console.log("----Inicio prueba de clases----");
    console.log("Carga de productos nuevos");
    await products.addProduct(productExample1);
    await products.addProduct(productExample2);
    await products.addProduct(productExample3);
    await products.addProduct(productExample4);
    console.log("Mostrando productos cargados...");
    console.log(await products.getProducts());
    console.log("Busqueda de producto por ID 1");
    console.log(await products.getProductById(1));
    console.log("Busqueda de producto por ID 15");
    console.log(await products.getProductById(15));
    console.log("Eliminando producto con ID 4");
    await products.deleteProduct(3);
    console.log("Modificando producto con ID 3");
    await products.updateProduct(2, { price: 52222, stock: 43 });
    console.log("Mostrando productos cargados...");
    console.log(await products.getProducts());
    console.log("----Fin prueba de clases----");
  } catch (error) {
    console.log(error);
  }
}

test();
