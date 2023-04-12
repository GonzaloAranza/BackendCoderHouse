import express from "express"
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import homeRouter from './routes/homeRouter.js'
import realTimeRouter from './routes/realTimeProductsRouter.js'


import {engine} from "express-handlebars";
import {resolve} from 'path';
import {Server} from "socket.io";
import {createServer} from "http";



const app = express ()



app.use(express.json())
app.use(express.urlencoded( {extended:true} ))



//routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/',homeRouter)
app.use('/realTimeProducts',realTimeRouter)
app.use('/products',realTimeRouter)


//views:

const viewsPath = resolve(process.cwd(),'./views');
console.log(viewsPath)

const httpServer = createServer(app)
const SERVER_PORT = 8083;

const io = new Server(httpServer)

app.engine('handlebars',engine({
    layoutsDir:`${viewsPath}/layouts`,
    defaultLayout:`${viewsPath}/layouts/main.handlebars`
}))

app.set('view engine','handlebars')
app.set('views',viewsPath)
app.set('io',io)

io.on('connection',()=>{
    console.log('cliente conectado')
})

httpServer.listen(SERVER_PORT,()=>{
    console.log(`servidor escuchando en el puerto ${SERVER_PORT}`)
}) 