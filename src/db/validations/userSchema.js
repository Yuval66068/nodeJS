import Joi from "joi";
import { israeliPhoneNumberPattern, passwordPattern } from "./patterns.js";

export const userSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).required(),
    middle: Joi.string().optional(),
    last: Joi.string().min(2).required(),
  }),
  address: Joi.object({
    state: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    street: Joi.string().min(2).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
  }),
  image: Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().required(),
  }),
  phone: Joi.string().pattern(israeliPhoneNumberPattern),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(passwordPattern),
  isBusiness: Joi.boolean().required(),
});
