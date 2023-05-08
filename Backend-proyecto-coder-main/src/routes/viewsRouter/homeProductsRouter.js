import { Router } from 'express'
import productManager from '../../manager/productManager.js'

const homeProductRouter = Router()
const manager = new productManager()

homeProductRouter.get('/', async (req, res) => {
  try {
    const listRpoducts = await manager.getProducts()
    res.render('homeProducts', { products: listRpoducts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
export default homeProductRouter
