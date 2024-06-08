import type { User } from "@prisma/client";
import type { Request } from "express";
import Joi from "joi";

const RegisterValidator = (res: Request) =>
  Joi.object<Pick<User, "name" | "email" | "password">>({
    name: Joi.string()
      .messages({
        "any.required": res.t("nameRequired"),
      })
      .required(),
    email: Joi.string()
      .email()
      .messages({
        "string.email": res.t("emailInvalid"),
        "any.required": res.t("emailRequired"),
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .messages({
        "string.pattern.base": res.t("passwordInvalid"),
        "string.min": res.t("passwordInvalid"),
        "any.required": res.t("passwordRequired"),
      })
      .required(),
  });

export default RegisterValidator;
