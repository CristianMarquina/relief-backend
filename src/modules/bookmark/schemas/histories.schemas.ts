import Joi from "joi";

export const bookmarkSchema = Joi.object({
  historyid: Joi.string().required().messages({
    "string.empty": "The 'historyid' field is required and cannot be empty.",
    "any.required": "The 'historyid' field is required.",
  }),
});
