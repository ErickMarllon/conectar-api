export type JwtConfig = {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
  forgotSecret: string;
  forgotExpiresIn: string;
  confirmEmailSecret: string;
  confirmEmailExpiresIn: string;
};
