import { Schema } from "mongoose";

export const addressSchema = new Schema({
    state: {type:String, required:true, minLength:2, maxLength: 50},
    country: {type:String, required:true, minLength:2, maxLength: 50},
    city: {type:String, required:true, minLength:2, maxLength: 50},
    street: {type:String, required:true, minLength:2, maxLength: 50},
    houseNumber: {type:Number, required:true, minLength:2, maxLength: 50},
    zip: {type:Number, required:true, minLength:2, maxLength: 50},
})