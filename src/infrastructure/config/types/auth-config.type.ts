export type AuthConfig = {
  salts: number;
  inactiveDays: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
};
