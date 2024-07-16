import { Schema } from "mongoose";
import { imageSchema } from "./imageSchema.js";
import { addressSchema } from "./addressSchema.js";

export const cardSchema = new Schema({
    title: {type:String, required:true, minLength:2, maxLength: 50},
    subTitle: {type:String, required:true, minLength:2, maxLength: 50},
    description: {type:String, required:true, minLength:2, maxLength: 50},
    phone: {type:String, required:true, minLength:9, maxLength: 11},
    email: {type:String, required:true, minLength:5, maxLength: 30},
    web: {type:String, required:true, minLength:2, maxLength: 100},
    image: {type: imageSchema, required:true},
    address: {type: addressSchema, required:true},
    likes:[{type:String}],
    // userId: {type:String, required:true},
}, {timestamps:true})