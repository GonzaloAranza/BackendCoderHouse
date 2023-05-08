import cartManager from '../manager/cartManager.js'

const manager = new cartManager()

class cartController {
  static create = async (req, res) => {
    try {
      const cart = await manager.create()
      res.status(201).send({ message: 'Cart created', cart })
    } catch (error) {
      res.status(404).send({ error: error.message })
    }
  }
}

export const getAll = async (req, res) => {
  try {
    const carts = await manager.getAll()
    res.status(200).send(carts)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

export const getOne = async (req, res) => {
  try {
    const param = req.params.cid
    const cart = await manager.getOne(param)
    res.status(200).send({ message: 'Cart found', cart })
  } catch (error) {
    console.log(error.message)
  }
}

export const addProduct = async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await manager.addProduct(cid, pid)
    res.status(200).send({ message: 'Product added' })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteOne = async (req, res) => {
  try {
    const param = req.params.cid
    const cart = await manager.deleteOne(param)
    res.status(200).send({ message: 'Cart deleted' })
  } catch (error) {
    console.log(error.message)
  }
}

export default cartController
