import type Joi from "joi";

const joiFormat = (error: Joi.ValidationError) => {
  return error.details.map((error) => ({
    message: error.message,
    type: error.type,
    path: error.path[0],
    value: error.context?.value || null,
  }));
};

export default joiFormat;
