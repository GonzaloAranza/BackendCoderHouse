import { Router } from 'express'
import homeProductRouter from './viewsRouter/homeProductsRouter.js'
import realTimeProductsRouter from './viewsRouter/realTimeProductsRouter.js'
import productRouter from './productRouter/productRouter.js'
import cartRouter from './cartRouter/cartRouter.js'

const router = new Router()

router.use('/', homeProductRouter)
router.use('/realtimeproducts', realTimeProductsRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)

export default router
