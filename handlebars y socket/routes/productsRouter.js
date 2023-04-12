import { Router }from "express";
import ProductManager from "../productManager.js";
import { Product } from "../productManager.js";



const router = Router ();

// router.get('/',async(req, res) => {
//     try {
//         const { limit } = req.query;
//         const data = await ProductManager.getProducts();
//         console.log(data)
//         const result = limit ? data.slice(0, Number(limit)) : data;

//         res.send(result);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

router.get('/', async (req, res) => {
    try {
      const { limit } = req.query;
      const productManager = new ProductManager('productos.json');
      await productManager.getProducts(); // Load products data from file
      const data = productManager.getArrayOfProducts();
      const result = limit ? data.slice(0, Number(limit)) : data;
      res.send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.get("/:pid", async (req, res) => {
    try {
      const productManager = new ProductManager('productos.json');
      const productId = Number(req.params.pid); // Convertir el parámetro :pid en un número
      const product = await productManager.getProductById(productId);
      if (!product) {
        res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //modificar post para que actualice la vista, con el io.emit
  router.post('/', async (req, res) => {
    try {


      const { title, description, price, thumbnail, code, stock, status, category } = req.body;

      if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).send('Missing required fields');
      }

      const product = new Product(title, description, price, thumbnail, code, stock, status, category);
      const productManager = new ProductManager('productos.json');
      const newProduct = await productManager.addProduct(product);
      
      res.send(newProduct);
      const io = req.app.get("io");
      io.emit('productCreated', newProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put("/:pid", async (req, res) => {
    try {
      const productManager = new ProductManager("productos.json");
      const productId = Number(req.params.pid);
      const updatedProduct = req.body;
  
      const currentProduct = await productManager.getProductById(productId);
  
      if (!currentProduct) {
        res.status(404).send("Product not found");
      }
  
      const mergedProduct = { ...currentProduct, ...updatedProduct };
      await productManager.updateProduct(productId, mergedProduct);
  
      res.send(mergedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });

    //modificar post para que actualice la vista, con el io.emit

    router.delete("/:pid", async (req, res) => {
      try {
        const productManager = new ProductManager("productos.json");
        const productId = Number(req.params.pid);
        
        let productRemoved = await productManager.deleteProduct(productId);
        
        const io = req.app.get("io");
        io.emit("productRemoved", productId);
        res.send(productRemoved);
    
      } catch (error) {
        res.status(404).send(error);
      }
    });


export default router