import Joi from "joi";

export const historySchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.empty": "The 'url' field is required and cannot be empty.",
    "any.required": "The 'url' field is required.",
  }),
  name: Joi.string().max(64).optional().messages({
    "string.max": "The 'name' field can have a maximum of 64 characters.",
  }),
});
