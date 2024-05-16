import en from "../../locales/en/translation.json";
import type { TFunction } from "i18next";
import { Request } from "express";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
    };
  }
}

declare module "express" {
  export interface Request {
    t: TFunction;
  }
}
