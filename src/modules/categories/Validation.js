import Joi from "joi";

export default {
  addCategory: {
    body: {
      name: Joi.string()
        .required()
        .min(5)
        .trim(),
      description: Joi.string()
        .required()
        .min(5)
    }
  },
  editCategory: {
    body: {
      name: Joi.string()
        .required()
        .min(5)
        .trim(),
      description: Joi.string()
        .required()
        .min(5)
    }
  }
};
