import { Router } from "express";
import { add, deleteOne, find, getOne, updateOne } from "../../controllers/productController.js";

const productRouter = Router();

//GET products from DB. Req.query limited the number of products to show
productRouter.get('/', find );

//GET products by ID from productManager
productRouter.get('/:pid', getOne );

//PUT products at productManager
productRouter.post('/', add );

//PUT products at productManager. Req.params.pid is the id of the product to update
productRouter.put('/:pid', updateOne);

//DELETE products at productManager. Req.params.pid is the id of the product to delete
productRouter.delete('/:pid',deleteOne)


export default productRouter;
