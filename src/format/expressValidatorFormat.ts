import type {
  FieldValidationError,
  Result,
  ValidationError,
} from "express-validator";

const expressValidatorFormat = (errors: Result<FieldValidationError>) => {
  return errors.array().map((error) => ({
    type: error.type,
    value: error.value || null,
    message: error.msg,
    path: error.path,
  }));
};

export default expressValidatorFormat;
