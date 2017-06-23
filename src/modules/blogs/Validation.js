import Joi from 'joi';

export default {
  createPost: {
    body: {
      title: Joi.string().required().min(5).trim(),
      slug: Joi.string().required().min(5).lowercase().trim(),
      description: Joi.string().required().min(5),
    }
  },
  updatePost: {
    body: {
      title: Joi.string().required().min(5).trim(),
      slug: Joi.string().required().min(5).lowercase().trim(),
      description: Joi.string().required().min(5),
    }
  }
}
