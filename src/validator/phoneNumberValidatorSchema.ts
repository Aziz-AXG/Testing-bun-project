import Joi from "joi";
import type { sendPhoneNumberType } from "../@types/types";
import type { Request } from "express";

const sendPhoneNumberSchema = (req: Request) =>
  Joi.object<sendPhoneNumberType>({
    PhoneNumber: Joi.string()
      .pattern(/^\d{10,11}$/)
      .messages({
        "string.pattern.base": req.t("digitBetween10or11"),
        "any.required": req.t("phoneNumberRequired"),
      })
      .required(),

    name: Joi.string()
      .max(30)
      .messages({
        "any.required": req.t("nameRequired"),
        "string.max": req.t("maxLength30"),
      })
      .required(),
  });

export default sendPhoneNumberSchema;
