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
    .withMessage((value, { req }) => req.t("nameRequired"))
    .notEmpty()
    .withMessage((value, { req }) => req.t("nameRequired"))
    .isLength({ max: 30 })
    .withMessage((value, { req }) => req.t("maxLength30")),
  body("phoneNumber")
    .isString()
    .withMessage((value, { req }) => req.t("phoneNumberRequired"))
    .notEmpty()
    .withMessage((value, { req }) => req.t("phoneNumberRequired"))
    .matches(/^\d+$/)
    .withMessage((value, { req }) => req.t("numberMustBeDigit"))
    .isLength({ min: 10, max: 11 })
    .withMessage((value, { req }) => req.t("numberLength")),
  body("email")
    .isEmail()
    .withMessage((value, { req }) => req.t("emailInvalid"))
    .notEmpty()
    .withMessage((value, { req }) => req.t("emailRequired")),
  body("password")
    .isString()
    .withMessage((value, { req }) => req.t("passwordRequired"))
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage((value, { req }) => req.t("passwordInvalid"))
    .notEmpty()
    .withMessage((value, { req }) => req.t("passwordRequired")),
  body("gender")
    .isIn(["Female", "Male", "Non binary"])
    .withMessage((value, { req }) => req.t("genderInvalid"))
    .notEmpty()
    .withMessage((value, { req }) => req.t("genderRequired")),

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
