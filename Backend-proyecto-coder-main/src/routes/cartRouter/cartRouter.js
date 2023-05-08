import { Router } from 'express'
import cartManager from '../../manager/cartManager.js'
import cartController, { addProduct, deleteOne, getAll, getOne } from '../../controllers/cartController.js'

// new instanse of cartManager
const manager = new cartManager()
const cartRouter = Router()

// Create empty cart.
cartRouter.post('/', cartController.create)

cartRouter.get('/', getAll)

cartRouter.get('/:cid', getOne)

cartRouter.post('/:cid/product/:pid', addProduct)

cartRouter.delete('/:cid', deleteOne)

// Falta hacer router que elimine el producto de un carrito
// Falta hacer put que actualice el producto de un carrito
// Falta put que actualice solo cantidad
// Falta hacer delete de todos los productos de carrito

export default cartRouter
