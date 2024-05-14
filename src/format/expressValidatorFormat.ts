import type { Result, ValidationError } from "express-validator";

const expressValidatorFormat = (errors: Result<ValidationError>) => {
  return errors.array().map((error: any) => ({
    type: error.type,
    value: error.value || null,
    message: error.msg,
    path: error.path,
  }));
};

export default expressValidatorFormat;
