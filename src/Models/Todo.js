import Joi from "joi";

const todoValidation = data => {
  const schema = {
    item: Joi.string()
      .trim()
      .required(),
    description: Joi.string()
      .trim()
      .required(),
    completed: Joi.number()
      .integer()
      .max(1)
      .required()
  };
  return Joi.validate(data, schema);
};

export default todoValidation;
