import { type Request, type Response } from "express";
import { CustomError } from "../middleware/ErrorHandler";
import joiFormat from "../format/joiFormat";
import phoneNumberValidatorSchema from "../validator/phoneNumberValidatorSchema";

export const sendPhoneNumber = async (req: Request, res: Response) => {
  const { error, value } = phoneNumberValidatorSchema(req).validate(req.body, {
    abortEarly: false, //? check all valid value be for send error
  });

  if (error) {
    res.status(400).json({ errors: joiFormat(error) });
    return;
  }

  if (value.PhoneNumber.charAt(0) === "0") {
    value.PhoneNumber = value.PhoneNumber.substring(1);
  }
  const otp = String(Math.floor(Math.random() * 1000000));

  //? Simulating a SMS API server error by throwing an error
  // throw new CustomError("Internal Server Error", 500, "SERVER_ERROR");

  //? Simulating a DB Crash error by throwing an error
  // throw new CustomError("Could not connect to the DB", 500, "DB_ERROR");

  // const salt = await bcrypt.genSalt()

  // const hashOtp = await bcrypt.hash(otp, salt)

  // await otpModel.create({
  //     PhoneNumber,
  //     otp: hashOtp
  // }
  //? remove it in build project
  console.log(otp);

  res.status(201).json({ message: req.body });
};
