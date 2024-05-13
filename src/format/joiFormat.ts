import type Joi from "joi";

const joiFormat = (error: Joi.ValidationError) => {
  return error.details.map((detail) => ({
    message: detail.message,
    type: detail.type,
    path: detail.path[0],
    value: detail.context?.value || null,
  }));
};

export default joiFormat;
