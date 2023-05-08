import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
// DB collection's name
const productCollection = "products";

//Schema definition for the product
const productSchema = new mongoose.Schema({
title: { type: Schema.Types.String, required: true },
description: { type: Schema.Types.String, required: true },
price: { type: Schema.Types.Number, required: true },
thumbnail: { type: Schema.Types.String, required: true },
code: { type: Schema.Types.String, required: true, unique: true },
stock: { type: Schema.Types.Number, required: true },
status: { type: Schema.Types.Boolean, default: true },
category: { type: Schema.Types.String, required: true },
}); 

//Pagination plugin
productSchema.plugin(mongoosePaginate);


//The schema provides functionality to the application
export default mongoose.model(productCollection, productSchema); 