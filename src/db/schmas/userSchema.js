import { Schema } from "mongoose";
import { imageSchema } from "./imageSchema.js";
import { addressSchema } from "./addressSchema.js";
import { nameSchema } from "./nameSchema.js";

export const userSchema = new Schema({
    name: {type:nameSchema},
    isBusiness: {type:Boolean},
    phone: {type:String},
    email: {type:String},
    password: {type:String},
    image: {type: imageSchema},
    address: {type: addressSchema},
    isAdmin: {type:Boolean, required:false},
}, {timestamps:true})