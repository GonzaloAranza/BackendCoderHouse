import { Router } from "express";
import CartManager from "../cartManager.js";

const cartManager = new CartManager();
const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const data = await cartManager.getProductByShoppingCartId(Number(cid));
        res.send(data);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        await cartManager.createFile();
        const result = await cartManager.addCart(body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartManager.addProductToCartById(Number(cid), Number(pid))
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;