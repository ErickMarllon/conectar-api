import { hashPassword, verifyPassword } from '../password.util';

describe('Password Utilities', () => {
  const plainPassword = 'mypasswordStrong123!';

  it('should hash the password', async () => {
    const hashed = await hashPassword(plainPassword);
    expect(typeof hashed).toBe('string');
    expect(hashed).toContain('$argon2');
  });

  it('should validate the correct password', async () => {
    const hashed = await hashPassword(plainPassword);
    const isValid = await verifyPassword(plainPassword, hashed);
    expect(isValid).toBe(true);
  });

  it('should return false for invalid password', async () => {
    const hashed = await hashPassword(plainPassword);
    const isValid = await verifyPassword('SenhaErrada!', hashed);
    expect(isValid).toBe(false);
  });

  it('should throw an error when hashing fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const pass: string = undefined as any;
    await expect(hashPassword(pass)).rejects.toThrow('Can not hash password.');

    consoleErrorSpy.mockRestore();
  });
});
