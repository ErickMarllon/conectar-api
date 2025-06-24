import argon2, { Options } from 'argon2';

export const hashPassword = async (
  password: string,
  options?: Options,
): Promise<string> => {
  try {
    return await argon2.hash(password, options);
  } catch (err) {
    console.error(err);
    throw new Error('Can not hash password.');
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    console.error(err);
    return false;
  }
};
