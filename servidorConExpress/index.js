const express = require('express');
const app = express();
const { ProductManager } = require('./productManager');

const productManager = new ProductManager('productos.json');



app.get('/products', async (req, res) => {
  const limit = req.query.limit || -1; // Si no se proporciona el límite, devolver todos los productos
  await productManager.getProducts();
  let products = productManager.getArrayOfProducts();

  if (limit !== -1) {
    products = products.slice(0, limit); // Devuelve solo el número de productos solicitados
  }

})

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(Number(productId));
  res.json(product);
});



app.listen(8080, () => {
  console.log('Server running on port 8080');
});