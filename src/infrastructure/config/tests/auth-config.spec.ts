import authConfig from '../auth.config';

describe('authConfig', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  describe('salts', () => {
    it('should return the value of AUTH_SALTS', async () => {
      process.env.AUTH_SALTS = '12';
      const config = await authConfig();
      expect(config.salts).toBe(12);
    });

    it('should throw an error when AUTH_SALTS is invalid', async () => {
      process.env.AUTH_SALTS = 'abc';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_SALTS is negative', async () => {
      process.env.AUTH_SALTS = '-1';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('inactiveDays', () => {
    it('should return the value of AUTH_INACTIVE_DAYS', async () => {
      process.env.AUTH_INACTIVE_DAYS = '15';
      const config = await authConfig();
      expect(config.inactiveDays).toBe(15);
    });

    it('should throw an error when AUTH_INACTIVE_DAYS is not an integer', async () => {
      process.env.AUTH_INACTIVE_DAYS = 'abc';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_INACTIVE_DAYS is negative', async () => {
      process.env.AUTH_INACTIVE_DAYS = '-1';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('maxLoginAttempts', () => {
    it('should return the value of AUTH_MAX_LOGIN_ATTEMPTS', async () => {
      process.env.AUTH_MAX_LOGIN_ATTEMPTS = '5';
      const config = await authConfig();
      expect(config.maxLoginAttempts).toBe(5);
    });

    it('should throw an error when AUTH_MAX_LOGIN_ATTEMPTS is invalid', async () => {
      process.env.AUTH_MAX_LOGIN_ATTEMPTS = 'not-a-number';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_MAX_LOGIN_ATTEMPTS is negative', async () => {
      process.env.AUTH_MAX_LOGIN_ATTEMPTS = '-10';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('lockoutDuration', () => {
    it('should return the value of AUTH_LOCKOUT_DURATION', async () => {
      process.env.AUTH_LOCKOUT_DURATION = '300000';
      const config = await authConfig();
      expect(config.lockoutDuration).toBe(300000);
    });

    it('should throw an error when AUTH_LOCKOUT_DURATION is too high', async () => {
      process.env.AUTH_LOCKOUT_DURATION = '999999';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_LOCKOUT_DURATION is negative', async () => {
      process.env.AUTH_LOCKOUT_DURATION = '-100';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_LOCKOUT_DURATION is invalid', async () => {
      process.env.AUTH_LOCKOUT_DURATION = 'abc';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });
});
