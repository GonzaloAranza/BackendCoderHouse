class ProductManager{



    constructor(){
        this.products = [];
        this.idGenerate = 0;
    }
    
    addProduct(product)
    {
        
        const  {title,description,price,thumbnail,code,stock} = product //destructuro el obj
        
        if(!title||!description||!price||!thumbnail||!code||!stock)//valido campos
            throw Error('faltó ingreso de algun campo')

        const producto = this.products.find((producto) => producto.code === code)//verifico que no exista
        if(producto)
            throw Error('producto ya está en la lista');

        this.idGenerate++//incremento id 
        product.id = this.idGenerate
        this.products.push(product)//agrego producto
        
    }

    getProducts() {//muestro productosss
        return this.products;
      }

      getProductById(id) {//busco por id
        const product = this.products.find(p => p.id === id);//hago comparaciones en el array
        if (!product) {//si no existe...
          throw Error('producto no encontrado')
        }
        return product;//si existe...
      }
 }






 //pruebas de clase: genera los 3 productos y los muestra. Existosa.


//  let manager = new ProductManager()

//  manager.addProduct({title:'banana',
//                     description:'alimento',
//                     price:10,
//                     thumbnail:"../frutas",
//                     code:001,
//                     stock: 100})


//                     manager.addProduct({title:'manzana',
//                     description:'alimento',
//                     price:102,
//                     thumbnail:"../frutas",
//                     code:004,
//                     stock: 100})

//                     manager.addProduct({title:'pera',
//                     description:'alimento',
//                     price:152,
//                     thumbnail:"../frutas",
//                     code:024,
//                     stock: 100})

// console.log(manager.getProducts())


//segunda prueba: hay dos code iguales, deberia arrojar error. Exitosa

//  let manager = new ProductManager()

//  manager.addProduct({title:'banana',
//                     description:'alimento',
//                     price:10,
//                     thumbnail:"../frutas",
//                     code:001,
//                     stock: 100})


//                     manager.addProduct({title:'manzana',
//                     description:'alimento',
//                     price:102,
//                     thumbnail:"../frutas",
//                     code:001,
//                     stock: 100})

//                     manager.addProduct({title:'pera',
//                     description:'alimento',
//                     price:152,
//                     thumbnail:"../frutas",
//                     code:024,
//                     stock: 100})

// console.log(manager.getProducts())



//tercera prueba: búsqueda por ID. Exitosa

//  let manager = new ProductManager()

//  manager.addProduct({title:'banana',
//                     description:'alimento',
//                     price:10,
//                     thumbnail:"../frutas",
//                     code:001,
//                     stock: 100})

// console.log(manager.getProductById(1));



//----cuarta prueba: búsqueda por ID fallida. Exitosa-----

//  let manager = new ProductManager()

//  manager.addProduct({title:'banana',
//                     description:'alimento',
//                     price:10,
//                     thumbnail:"../frutas",
//                     code:001,
//                     stock: 100})

// console.log(manager.getProductById(3));