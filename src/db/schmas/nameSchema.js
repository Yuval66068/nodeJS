import { Schema } from "mongoose";

export const nameSchema = new Schema({
    first: {type:String},
    middle: {type:String},
    last: {type:String},
},{ _id: false })