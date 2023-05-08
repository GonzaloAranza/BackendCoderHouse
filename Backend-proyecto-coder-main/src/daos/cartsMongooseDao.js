import cartSchema from "../models/cartSchema.js";

class cartMongooseDao {

// addProduct to cart -- delete cart

    async create () {

        return await cartSchema.create({ products: [] });

        // const cart = await cartSchema.findOne(data);
        
        // if(!cart) {
        //     const newCart = await cartSchema.create(data);
    
        //     return {
        //     id: newCart._id,
        //     products: newCart.products
        //     }
            
        // }
        // throw new Error(`Cart already exists`);
    }

    async getAll () {
        return await cartSchema.find();
    }

    async getOne (id) {
        const cart = await cartSchema.findOne( {_id:id} );
        return {
            id: cart._id,
            products: cart.products
        }
    }

    async updateOne (id, data) {
        const cart = await cartSchema.findOneAndUpdate( {_id:id}, data );
        return {
            id: cart._id,
            products: cart.products
        }

    }

    async deleteOne (id) {
        return await cartSchema.findOneAndDelete( {_id:id} );
    }

    async delete () {
        return await cartSchema.deleteMany();
    }
}

export default cartMongooseDao;