import { Router } from 'express'
import productManager from '../../manager/productManager.js'
import { socketServer } from '../../app.js'

const realTimeProductsRouter = Router()
const manager = new productManager()

realTimeProductsRouter.get('/', async (req, res) => {
  try {
    const listRpoducts = await manager.getProducts()
    res.render('realTimeProducts', { products: listRpoducts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default realTimeProductsRouter
