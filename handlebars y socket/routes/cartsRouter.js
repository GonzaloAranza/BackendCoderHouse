import { Router } from "express";
// import CartManager from "../cartManager.js";
import CartManager2 from "../cartManager2.js"

// const cartManager = new CartManager();
const router = Router();

const cartManager2 = new CartManager2('./prueba.json');

// router.get('/:cid', async (req, res) => {
//     try {
//         const { cid } = req.params;
//         const data = await cartManager.getProductByShoppingCartId(Number(cid));
//         res.send(data);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// });


router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const data = await cartManager2.getProductsByCartID(Number(cid));
        res.send(data);
    } catch (error) {
        res.status(404).send(error);
    }
});


// router.post('/', async (req, res) => {
//     try {
//         const { body } = req;
//         await cartManager.createFile();
//         const result = await cartManager.addCart(body);
//         res.send(result);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });



router.post('/', async (req, res) => {
    try {
      const cartItems = req.body;
      if (!Array.isArray(cartItems)) {
        throw new Error('El cuerpo de la solicitud debe ser un arreglo');
      }
      if (!cartItems.every(item => typeof item === 'object' && item !== null && 'id' in item && typeof item.id === 'number' && 'quantity' in item && typeof item.quantity === 'number' && item.quantity >0)) {
        throw new Error('Cada elemento del arreglo debe ser un objeto con las propiedades "id" y "quantity" de tipo numérico');
      }
      
      const result = await cartManager2.addCart(cartItems);
      res.send(result);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });


// router.post('/:cid/product/:pid', async (req, res) => {
//     try {
//         const { cid, pid } = req.params;
//         const result = await cartManager.addProductToCartById(Number(cid), Number(pid))
//         res.send(result);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

router.post('/:cid/product/:pid', async (req, res)=>{
  try {
    const {cid,pid} = req.params;
    const result = await cartManager2.addProductToCart(Number(cid), Number(pid));
    res.send(result)
  } catch (error) {
    res.status(500).send(error);
  }
})

export default router;