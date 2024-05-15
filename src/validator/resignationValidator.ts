import type { NextFunction, Request, Response } from "express";
import {
  Result,
  body,
  validationResult,
  type FieldValidationError,
} from "express-validator";
import expressValidatorFormat from "../format/expressValidatorFormat";

export const resignationValidator = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name Required")
    .isLength({ max: 30 })
    .withMessage("Max length is 30 char"),
  body("phoneNumber")
    .isString()
    .notEmpty()
    .withMessage("phoneNumber Required")
    .matches(/^\d+$/)
    .withMessage("Number must be a digit.")
    .isLength({ min: 10, max: 11 })
    .withMessage("Number must be between 10 or 11"),
  body("email")
    .isEmail()
    .withMessage("Not a valid e-mail")
    .notEmpty()
    .withMessage("Email Required"),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
    )
    .notEmpty()
    .withMessage("Password Required"),
  body("gender")
    .isIn(["Female", "Male", "Non binary"])
    .withMessage("Select a gender.")
    .notEmpty()
    .withMessage("gender Required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: expressValidatorFormat(
          errors as unknown as Result<FieldValidationError>
        ),
      });
    }
    next();
  },
];
