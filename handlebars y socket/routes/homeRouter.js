import { Router } from "express";
import ProductManager from "../productManager.js";


const router = Router()
const productManager = new ProductManager('./productos.json')


router.get('/',async (req,res)=>{
    try{
    await productManager.getProducts()
    const data = productManager.getArrayOfProducts();
    console.log(data)
    res.render('homeview', { title: 'Lista de Productos', data})
    }
    catch(error){
        res.status(404).send(error)
    }
})



export default router