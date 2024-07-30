import { Schema } from "mongoose";
import { imageSchema } from "./imageSchema.js";
import { addressSchema } from "./addressSchema.js";
import { nameSchema } from "./nameSchema.js";

export const userSchema = new Schema({
    name: {type:nameSchema},
    phone: {type:String},
    email: {type:String},
    password: {type:String},
    image: {type: imageSchema},
    address: {type: addressSchema},
    isBusiness: {type:Boolean},
    isAdmin: {type:Boolean, required:false, default:false},
}, {timestamps:true})