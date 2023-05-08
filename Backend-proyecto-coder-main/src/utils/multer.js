import multer from 'multer'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve('src/public'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const uploader = multer({ storage })
// del lado del cliente el uploader se usa de la siguiente manera:
// manager.post('/', uploader.single('image'), (req, res) => {(**condicional para saber si se subio la imagen o la logica que querramos poner en la carga de imagen**)});
