import fs from 'fs';

class Product{

    title = '';
    description = '';
    price = 0;
    thumbnail = [];
    code = 0;
    stock = 0;
    status = true;
    category = '';
    


    constructor (title,description,price,thumbnail,code,stock,status = true,category){
       this.title = title;
       this.description = description;
       this.price = price;
       this.thumbnail = thumbnail;
       this.code = code;
       this.stock = stock; 
       this.status = status;
       this.category = category
    }
}

class ProductManager{

    #path = '';
    #id = 0;
    products = [];



    constructor(path){
       if(!fs.existsSync(path)){
            fs.writeFileSync(path,'','utf-8')          
       }
       this.#path = path
    }


    checkIfObjectIsAProduct = (product) => {
        if (product instanceof Product) {
            return product;
        }
        throw Error('Error: no es un producto');
    }

    assignIdVariable = () =>{
        let lastProduct = this.products[this.products.length - 1]
        this.#id = lastProduct.id
    }

    // extractProducts = async () =>
    // {
    //     let data = await fs.promises.readFile(this.#path,'utf-8')
    //     if(data)
    //         this.products = [...(JSON.parse(data))]

    //     console.log('productos que extraje:',data)
    //     }

    // getProducts = () => {
    //     return fs.promises.readFile(this.#path,'utf-8')
    //         .then((data) => {
    //             if(data){
    //                 this.products = [...(JSON.parse(data))]
    //                 this.assignIdVariable()
    //             }
    
    //         })
    // }

    getProducts = async () => {
        try{
            let data = await fs.promises.readFile(this.#path,'utf-8')
            this.products = [...(JSON.parse(data))]
            this.assignIdVariable()
        }catch(e){
            fs.promises.writeFile(this.#path,'','utf-8')
        }
            
    }

    addProduct = async (product) => {

        await this.getProducts()

        const validateProduct = this.checkIfObjectIsAProduct(product)
        this.products.push({...validateProduct,id : ++this.#id})
        
        try{
            await fs.promises.writeFile(this.#path,JSON.stringify(this.products),'utf-8')       
        }catch(e){
            console.log('Error:',e)
        }
    }  

    getArrayOfProducts = () => {
        return this.products
    }

    getProductById = async (id) => {
        try {
            await this.getProducts()

            const product = this.products.find((p) => p.id === id);

            if (!product) {
                throw new Error(`Product with id ${id} not found`);  
            }

            return product
         
        }  catch (error) {
            throw ({Error: error.toString()})
        }
        
    }

    deleteProduct = async (id) => {
        try {
           await this.getProducts()
           const productId = this.products.findIndex((p) => p.id === id);
           
            if(productId === -1)
                throw Error ('index out of range')

            let productRemoved =  this.products.splice(productId,1)
            await fs.promises.writeFile(this.#path,JSON.stringify(this.products))
            
            return productRemoved
        }  catch (error) {
            throw ({Error: error.toString()})

        }
        
    }

    updateProduct = async (id,campos) => {
        try {
            await this.getProducts()
            const productId = this.products.findIndex((p) => p.id === id);
            this.products[productId] = { ...this.products[productId], ...campos };
            await fs.writeFileSync('productos.json', JSON.stringify(this.products));


        } catch (error) {
            console.log(error)
        }
    }

    
}

export { Product };
export default ProductManager ;
