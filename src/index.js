import ProductManager from "./constructor/products.js";

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

console.log("----Inicio prueba de clases----");

const products = new ProductManager();
console.log("Cargando productos de ejemplo...");
products.initExample();
console.log("Carga de productos nuevos");
console.log(products.addProduct(productExample1));
console.log(products.addProduct(productExample2));
console.log(products.addProduct(productExample3));
console.log(products.addProduct(productExample4));
console.log("Mostrando productos cargados...");
console.log(products.getProducts());
console.log("Busqueda de producto por ID 1");
console.log(products.getProductById(1));
console.log("Busqueda de producto por ID 15");
console.log(products.getProductById(15));

console.log("----Fin prueba de clases----");
