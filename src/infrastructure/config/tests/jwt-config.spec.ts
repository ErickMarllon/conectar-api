import jwtConfig from '../jwt.config';

describe('jwtConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      JWT_SECRET: 'secret-key',
      JWT_TOKEN_EXPIRES_IN: '1d',
      JWT_REFRESH_SECRET: 'refresh-secret',
      JWT_REFRESH_TOKEN_EXPIRES_IN: '1d',
      JWT_FORGOT_SECRET: 'forgot-secret',
      JWT_FORGOT_TOKEN_EXPIRES_IN: '1d',
      JWT_CONFIRM_EMAIL_SECRET: 'confirm-secret',
      JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: '1d',
    };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  describe('secret', () => {
    it('should return the value of JWT_SECRET', async () => {
      process.env.JWT_SECRET = 'secret-key';
      const config = await jwtConfig();
      expect(config.secret).toBe('secret-key');
    });

    it('should throw an error when JWT_SECRET is an empty', async () => {
      process.env.JWT_SECRET = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_SECRET is not set', async () => {
      delete process.env.JWT_SECRET;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('expires', () => {
    it('should return the value of JWT_TOKEN_EXPIRES_IN', async () => {
      process.env.JWT_TOKEN_EXPIRES_IN = '1D';
      const config = await jwtConfig();
      expect(config.expiresIn).toBe('1D');
    });

    it('should throw an error when JWT_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.JWT_TOKEN_EXPIRES_IN = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.JWT_TOKEN_EXPIRES_IN;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('refreshSecret', () => {
    it('should return the value of JWT_REFRESH_SECRET', async () => {
      process.env.JWT_REFRESH_SECRET = 'secret-key';
      const config = await jwtConfig();
      expect(config.refreshSecret).toBe('secret-key');
    });

    it('should throw an error when JWT_REFRESH_SECRET is an empty', async () => {
      process.env.JWT_REFRESH_SECRET = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_REFRESH_SECRET is not set', async () => {
      delete process.env.JWT_REFRESH_SECRET;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('refreshExpires', () => {
    it('should return the value of JWT_REFRESH_TOKEN_EXPIRES_IN', async () => {
      process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = '1D';
      const config = await jwtConfig();
      expect(config.refreshExpiresIn).toBe('1D');
    });

    it('should throw an error when JWT_REFRESH_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_REFRESH_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('forgotSecret', () => {
    it('should return the value of JWT_FORGOT_SECRET', async () => {
      process.env.JWT_FORGOT_SECRET = 'secret';
      const config = await jwtConfig();
      expect(config.forgotSecret).toBe('secret');
    });

    it('should throw an error when JWT_FORGOT_SECRET is an empty', async () => {
      process.env.JWT_FORGOT_SECRET = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_FORGOT_SECRET is not set', async () => {
      delete process.env.JWT_FORGOT_SECRET;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('forgotExpires', () => {
    it('should return the value of JWT_FORGOT_TOKEN_EXPIRES_IN', async () => {
      process.env.JWT_FORGOT_TOKEN_EXPIRES_IN = '1D';
      const config = await jwtConfig();
      expect(config.forgotExpiresIn).toBe('1D');
    });

    it('should throw an error when JWT_FORGOT_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.JWT_FORGOT_TOKEN_EXPIRES_IN = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_FORGOT_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.JWT_FORGOT_TOKEN_EXPIRES_IN;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });

  describe('confirmEmailExpires', () => {
    it('should return the value of JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN', async () => {
      process.env.JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = '1D';
      const config = await jwtConfig();
      expect(config.confirmEmailExpiresIn).toBe('1D');
    });

    it('should throw an error when JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = '';
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN;
      await expect(async () => await jwtConfig()).rejects.toThrow(Error);
    });
  });
});
