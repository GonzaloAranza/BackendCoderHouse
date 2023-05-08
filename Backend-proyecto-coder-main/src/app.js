import express from 'express'
import { engine } from 'express-handlebars'
import { resolve } from 'path'
import { Server } from 'socket.io'
import router from './routes/index.js'
import productManager from './manager/productManager.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)

const app = express()
// Port to listen
const PORT = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const view = resolve('src/views')

app.engine('handlebars', engine({
  layoutsDir: `${view}/layouts`,
  defaultLayout: `${view}/layouts/main.handlebars`
}))

app.set('view engine', 'handlebars')
app.set('views', view)

app.use('/', router)

// Listen app(express) on port 8080. HTTP server
const httpServer = app.listen(PORT, () => { console.log('Server running on port 8080') })

const manager = new productManager()

// Socket.io
const socketServer = new Server(httpServer)
const get = manager.find()
socketServer.on('connection', async (socket) => {
  console.log(`New client connected. ID: ${socket.id}`)

  socket.on('new-product', async (data) => {
    console.log('data')
    manager.addProduct(data)
    socketServer.emit('listProducts', await get)
  })

  socket.on('delete-product', async (data) => {
    manager.deleteProduct(data)
    socketServer.emit('listProducts', await get)
  })
})

export { socketServer }
