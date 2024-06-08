import type { Request, Response } from "express";
import RegisterValidator from "../validator/registerValidator";
import joiFormat from "../format/joiFormat";
import prisma from "../utils/Prisma";
import Jwt from "jsonwebtoken";
import { privateKey } from "../utils/jwtKeys";
import { AppError } from "../middleware/ErrorHandler";
import loginValidator from "../validator/loginValidator";
import { excludeFieldsFromObject } from "../utils/excludeFields";

export const accountResignation = async (req: Request, res: Response) => {
  const { error, value } = RegisterValidator(req).validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({ errors: joiFormat(error) });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });

  if (user) {
    throw new AppError(
      req.t("EmailExist"),
      req.t("EmailExist"),
      400,
      req.path,
      value.email
    );
  }

  const hashedPassword = await Bun.password.hash(value.password);

  const token = Jwt.sign(
    { email: value.email, createAt: new Date() },
    privateKey,
    { algorithm: "RS256" }
  );

  await prisma.user.create({
    data: {
      name: value.name,
      email: value.email,
      password: hashedPassword,
      jwt_Signature: token.split(".")[2],
    },
  });

  return res.status(200).json({ token: token });
};

export const accountLogin = async (req: Request, res: Response) => {
  const { error, value } = loginValidator(req).validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({ errors: joiFormat(error) });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });

  if (!user) {
    throw new AppError(
      req.t("unCorrectInformation"),
      req.t("unCorrectInformation"),
      400,
      req.path,
      null
    );
  }

  const checkPassword = await Bun.password.verify(
    value.password,
    user.password
  );

  if (!checkPassword) {
    throw new AppError(
      req.t("unCorrectInformation"),
      req.t("unCorrectInformation"),
      400,
      req.path,
      null
    );
  }

  const token = Jwt.sign(
    { email: user.email, createAt: new Date() },
    privateKey,
    { algorithm: "RS256" }
  );
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      jwt_Signature: token.split(".")[2],
    },
  });

  return res.status(200).json({ token: token });
};

export const profile = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
  });
  if (!user) {
    throw new AppError(
      req.t("unCorrectInformation"),
      req.t("unCorrectInformation"),
      400,
      req.path,
      null
    );
  }
  return res
    .status(200)
    .json(excludeFieldsFromObject(user, ["password", "jwt_Signature"]));
};
