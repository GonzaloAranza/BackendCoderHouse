import cartMongooseDao from '../daos/cartsMongooseDao.js'
import productsMongooseDao from '../daos/productsMongooseDao.js'

class cartManager {
  constructor () {
    this.cartDao = new cartMongooseDao()
    this.productDao = new productsMongooseDao()
  }

  async create () {
    return this.cartDao.create()
  }

  async getAll () {
    return this.cartDao.getAll()
  }

  async getOne (id) {
    return this.cartDao.getOne(id)
  }

  async addProduct (cid, pid) {
    const product = await this.productDao.getOne(pid)
    if (!product) throw new Error(`Not found product with id: ${pid}`)

    const cart = await this.cartDao.getOne(cid)
    if (!cart) throw new Error(`Not found cart with id: ${cid}`)

    // Check if product already exists in cart
    const cartProductIndex = cart.products.findIndex(cartProduct => cartProduct.id.toString() === pid)
    if (cartProductIndex !== -1) {
      // If product already exists, increase its quantity
      cart.products[cartProductIndex].quantity += 1
    } else {
      // If product does not exist, add it to the cart with a quantity of 1
      cart.products.push({ id: product.id, quantity: 1 })
    }

    return this.cartDao.updateOne(cid, cart)
  }

  async deleteOne (id) {
    const cart = await this.cartDao.deleteOne(id)
    if (!cart) throw new Error(`Not found cart with id: ${id}`)
  }
}

export default cartManager
