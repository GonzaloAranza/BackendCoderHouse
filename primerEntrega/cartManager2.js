import  fs from 'fs';

class CartManager2{

    #lastId = Number();
    #path;

    constructor(path){
        if(!fs.existsSync(path)){
            fs.writeFileSync(path,'[]','utf-8')
            this.#lastId = 1;          
        }
        this.#path = path
     }

     getManager() {
        return {
          lastId: this.#lastId,
          path: this.#path,
          products: this.products
        }
      }

      addCart = async(products)=>
      {
        try {
            await this.assignLastId()
            let arrCarts = JSON.parse(await this.getDataFromFile())
            arrCarts = [...arrCarts,{id:this.#lastId,products}]
            this.saveData(arrCarts)

            return { message: `Carrito de compras creado con exito` };

        } catch (error) {
            throw error
        }
      }

      addProductToCart = async (cid,pid) =>{
        try{
        const arrCarts = JSON.parse(await this.getDataFromFile());
        const cart = arrCarts.find(c => c.id === +cid)
   
            if(!cart){
                throw new Error('El id de carrito no existe')
            }
            const product = cart.products.find(item => item.id === +pid);
            product ? product.quantity += 1 : cart.products = [...cart.products, { id: pid, quantity: 1 }];

            await this.saveData(arrCarts)
        }
        catch(error)
        {
            throw { error: error.message };
        }
     }

      getDataFromFile = async () =>{
        try {
            const data = await fs.promises.readFile(this.#path,{ encoding: 'utf-8' })
            return data;
        } catch (error) {
            throw { error: error.message };
        }
      };

      assignLastId = async () => {
        try {
            const data = await this.getDataFromFile()
            const arrCarts = JSON.parse(data);
            if(arrCarts.length ==0)
                this.#lastId = 1
            else
            this.#lastId = arrCarts[arrCarts.length -1 ].id + 1;
        } catch (error) {
            throw { error: error.message };
        }
      }


      saveData = async (data)=>{
        try {
            await fs.promises.writeFile(this.#path,JSON.stringify(data))
        } catch (error) {
            throw { error: error.message };
        }
    
    }

    getProductsByCartID = async(id) =>{
        try {
           const data = await this.getDataFromFile();
           const arrCarts = JSON.parse(data);

        const cart = arrCarts.find(c => c.id === id);
            return cart.products
        } catch (error) {
            throw { error: error.message };
        }
    }






}


export default CartManager2;
