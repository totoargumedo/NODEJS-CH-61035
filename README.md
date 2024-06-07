# PRACTICAS BACKEND MERN CODERHOUSE

# Desafío 7

- Clases ECMAScript y ECMAScript avanzado
- Manejo de archivos
- Servidor Web Endpoints GET
- CRUD de productos con Router, FS y Multer
- CRUD de carritos con Router y FS
- Motor de plantillas y Websocket
- DAOs, Persistencia en Mongo, chat Websockets y separación de responsabilidades
- Mejoras en los endpoints y pantallas

## Servidor

### Iniciar Servidor

```
npm run start
```

## Vistas

### Home

**/**
Muestra una pequeña bienvenida

### Productos

**/products**

Muestra todos los productos cargados en persistencia

### Carga de productos

**/products/realtimeproducts**

Muestra una lista de los productos cargados y un formulario para carga de nuevos productos.
Esta vista trabaja con Websockets para actualizar en tiempo real el listado de productos.
También avisa si se agregaron productos nuevos o se eliminaron.

### Chat en vivo

**/chat**

Permite ingresar un nombre de usuario y un mensaje, se muestra en tiempo real a todos los clientes conectados.

## Endpoints Productos

### GET

**/api/products**

Devuelve todos los productos cargados en memoria.

**/api/products?limit=4**

Recibe _limit_ como query
Devuelve los **4** primeros productos guardados en memoria.

**/api/products/:pid**
**/api/products/4**

Devuelve el producto con el _id_ especificado como parametro.
Devuelve el producto con _id_ **4**.

### POST

**/api/products**
Recibe por body un _objeto_ los siguientes campos, le asigna un id automatico y los guarda en memoria.
_title_: String (obligatorio),
_description_: String (obligatorio),
_price_ Number (obligatorio),
_thumbnails_: Array (opcional),
_code_: String (obligatorio, único),
_stock_: Number (obligatorio),
_status_: Boolean (opcional, por defecto _true_)
_category_: String (obligatorio),

### PUT

**/api/products/:pid**
**/api/products/4**
Recibe por parametro el _id_ de un producto y en el body un _objeto_ con uno o varios de los siguientes campos, los actualiza y los guarda en memoria:
_title_: String,
_description_: String,
_price_ Number,
_thumbnails_: Array,
_code_: String (único),
_stock_: Number,
_category_: String,

### DELETE

**/api/products/:pid**
**/api/products/4**
Recibe por parametro el _id_ de un producto y lo elimina de la memoria.

## Endpoints Carritos

### GET

**/api/carts**

Devuelve todos los carritos cargados en memoria.

**/api/carts/:cid**
**/api/carts/4**

Devuelve el carrito con el _id_ especificado como parametro
Devuelve el carrito con _id_ **4**

### POST

**/api/carts**
Crea un carrito, le asigna un id automatico y los guarda en memoria con los siguientes campos,
_id_: String,
_products_: Array de productos vacío,

**/api/carts/:cid/product/:pid**
**/api/carts/4/product/14**
**/api/carts/4/product/14?quantity=13**

Agrega un _objeto_ al array de productos del carrito especificado por _id_ en los parametros con los siguientes campos:
_id_: String,
_quantity_: Number (1 por defecto)

Devuelve el carrito actualizado con el _id_ especificado como parametro
Agrega el producto con _id_ 14 al carrito con _id_ **4**
Agrega _13_ unidades del producto con _id_ 14 al carrito con _id_ **4**
Si el producto ya existe, se suma la cantidad indicada o 1 en por defecto.

### DELETE

**/api/carts/:cid**
**/api/carts/4**
Recibe por parametro el _id_ de un carrito y lo elimina de la memoria.

**/api/carts/:cid/product/:pid**
**/api/carts/4/product/14**
**/api/carts/4/product/14?quantity=13**

Elimina la cantidad esecificada en **quantity** del _objeto_ del array de productos del carrito especificado por _id_ en los parametros con los siguientes campos:
Devuelve el carrito actualizado con el _id_ especificado como parametro
Elimina la cantidad especificada (o 1 por defecto) del producto con _id_ 14 del carrito con _id_ **4**
_Si la cantidad enviada es mayor a la existente el producto se elimina. Cantidad es igual a 1 por defecto_

## ProductManager

### Importar ProductManager

```
import ProductManager from "./managers/fs/products.manager.js";
```

### Instanciar ProductManager

Recibe el campo **filename** de tipo _String_ que funcionara como el nombre del archivo creado.
Al instanciar, buscara el archivo con el nombre indicado, de no encontrarlo lo creára vacío.

```
const products = new ProductManager(filename);
```

### Metodos

**addProduct**

Recibe un objeto con los campos:
_title_: String (obligatorio),
_description_: String (obligatorio),
_price_ Number (obligatorio),
_thumbnails_: Array,
_code_: String (obligatorio, único),
_stock_: Number (obligatorio),
_category_: String (obligatorio),

```
products.addProduct({
      title: "Auriculares ASTRO A10 Menta",
      description:
        "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
      price: 52500,
      thumbnails: ["https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1"],
      code: "A10M",
      stock: 16,
      category: "Inalámbricos"
    });
```

Agrega un elemento a memoria, agrega automaticamente el campo _id_ y devuelve el elemento creado.

**getProductById**

Recibe el id de un producto en formato _Number_

```
products.getProductById(1);
```

Devuelve el elemento con _id 1_ o _error_ si no lo encuentra

**getProducts**

```
products.getProducts();
```

Devuelve un arreglo con todos los elementos cargados en memoria

**updateProduct**

Recibe el **id** de un producto en formato _Number_ como primer argumento.
Recibe un _Object_ como segundo argumento con los campos a modificar del producto.

```
products.updateProduct(4,{price: 5423, title: "Auriculares ASTRO A10 Menta"});
```

Puede recibir uno o todos los siguientes campos en el segundo argumento:
_title_: String,
_description_: String,
_price_ Number,
_thumbnails_: Array,
_code_: String (único),
_stock_: Number,
_category_: String

**deleteProduct**
Recibe el **id** de un producto en formato _Number_ y lo elimina del archivo.

```
products.deleteProduct(id);
```

## CartManager

### Importar CartManager

```
import CartManager from "./managers/fs/carts.manager.js";
```

### Instanciar CartManager

Recibe el campo **filename** de tipo _String_ que funcionara como el nombre del archivo creado.
Al instanciar, buscara el archivo con el nombre indicado, de no encontrarlo lo creára vacío.

```
const carts = new CartManager(filename);
```

### Metodos

**newCart**
Crea un carrito nuevo con los siguientes campos:
_id_: String,
_products_: Array de objetos,

```
carts.newCart();
```

Agrega un elemento a memoria, agrega automaticamente el campo _id_ y devuelve el elemento creado.

**getCartById**

Recibe el id de un carrito en formato _Number_ y devuelve el contenido del Array _products_

```
carts.getCartById(1);
```

Devuelve el elemento con _id 1_ o _error_ si no lo encuentra

**getCarts**

```
cart.getCarts();
```

Devuelve un arreglo con todos los elementos cargados en memoria

**addProductsToCart**

Recibe el _id_ de un carrito en formato _Number_ como primer argumento.
Recibe el _id_ de un producto en formato _Number_ como segundo argumento.
Recibe la cantidad en formato _Number_ como tercer argumento opcional o la cantidad es _1_ por defecto .

```
carts.addProductsToCart(4,3);
```

Agrega _1_ unidad del **producto** con _id 3_ al arreglo de productos del carrito con _id 4_
Si el producto ya existe, se suma la cantidad indicada o 1 en por defecto.

```
carts.addProductsToCart(4,3,5);
```

Agrega _5_ unidades del **producto** con _id 3_ al arreglo de productos del carrito con _id 4_
Si el producto ya existe, se suma la cantidad indicada o 1 en por defecto.

**removeProductFromCart**
Recibe el _id_ de un carrito en formato _Number_ como primer argumento.
Recibe el _id_ de un producto en formato _Number_ como segundo argumento.
Recibe _quantity_ o cantidad del producto a eliminar.
_Si la cantidad enviada es mayor a la existente el producto se elimina. Cantidad es igual a 1 por defecto_

```
carts.removeProductFromCart(4,3,3);
```

Elimina **3** unidades del **producto** con _id 3_ al arreglo de productos del carrito con _id 4_

**deleteCart**
Recibe el **id** de un carrito en formato _Number_ y lo elimina de la memoria.

```
carts.deleteCart(id);
```
