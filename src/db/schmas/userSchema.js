import { Schema } from "mongoose";
import { imageSchema } from "./imageSchema.js";
import { addressSchema } from "./addressSchema.js";
import { nameSchema } from "./nameSchema.js";

export const userSchema = new Schema({
    name: {type:nameSchema, required:true},
    isBusiness: {type:Boolean, required:true},
    phone: {type:String, required:true, minLength:9, maxLength: 11},
    email: {type:String, required:true, minLength:5, maxLength: 30},
    password: {type:String, required:true, minLength:7, maxLength: 100},
    image: {type: imageSchema, required:true},
    address: {type: addressSchema, required:true},
}, {timestamps:true})