export type JwtPayload = {
  email: string;
  createAt: Date;
};

declare module "express" {
  export interface Request {
    user?: UserJwtPayload;
  }
}
