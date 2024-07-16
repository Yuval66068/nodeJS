import { Schema } from "mongoose";

export const nameSchema = new Schema({
    first: {type:String, required:true, minLength:2, maxLength: 20},
    middle: {type:String, required:true, minLength:2, maxLength: 20},
    last: {type:String, required:true, minLength:2, maxLength: 20},
})