# PRACTICAS BACKEND MERN CODERHOUSE

# Desafío 2

- Clases ECMAScript y ECMAScript avanzado
- Manejo de archivos

## ProductManager

### Importar ProductManager

```
import ProductManager from "./constructor/products.js";
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
_title_: String,
_description_: String,
_price_ Number,
_thumbnail_: String,
_code_: String (único),
_stock_: Number

```
products.addProduct({
      title: "Auriculares ASTRO A10 Menta",
      description:
        "Auriculares con cable para gaming para Xbox Series X|S, PlayStation 5, Switch, PC / MAC y más",
      price: 52500,
      thumbnail:
        "https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a10-gen-2/pdp-gallery-a10-gray-01-new.png?v=1",
      code: "A10M",
      stock: 16,
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
_thumbnail_: String,
_code_: String (único),
_stock_: Number

**deleteProduct**
Recibe el **id** de un producto en formato _Number_ y lo elimina del archivo.

```
products.deleteProduct(id);
```
