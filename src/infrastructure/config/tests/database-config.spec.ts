import databaseConfig from '../database.config';

describe('databaseConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  describe('url', () => {
    it('should return the value of DATABASE_URL', async () => {
      process.env.DATABASE_URL = 'localhost';
      const config = await databaseConfig();
      expect(config.url).toBe('localhost');
    });

    it('should return the empty value when DATABASE_URL is an empty', async () => {
      process.env.DATABASE_URL = '';
      const config = await databaseConfig();
      expect(config.url).toBe('');
    });

    it('should throw an error when DATABASE_URL is not set', async () => {
      delete process.env.DATABASE_URL;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('logging', () => {
    it('should return the value of DATABASE_LOGGING as a boolean', async () => {
      process.env.DATABASE_LOGGING = 'true';
      const config = await databaseConfig();
      expect(config.logging).toBe(true);
    });

    it('should return false when DATABASE_LOGGING is an empty', async () => {
      process.env.DATABASE_LOGGING = '';
      const config = await databaseConfig();
      expect(config.logging).toBe(false);
    });

    it('should return false when DATABASE_LOGGING is not set', async () => {
      delete process.env.DATABASE_LOGGING;
      const config = await databaseConfig();
      expect(config.logging).toBe(false);
    });
  });

  describe('migrationsRun', () => {
    it('should return the value of DATABASE_MIGRATIONS_RUN as a boolean', async () => {
      process.env.DATABASE_MIGRATIONS_RUN = 'true';
      const config = await databaseConfig();
      expect(config.migrationsRun).toBe(true);
    });

    it('should return false when DATABASE_MIGRATIONS_RUN is an empty', async () => {
      process.env.DATABASE_MIGRATIONS_RUN = '';
      const config = await databaseConfig();
      expect(config.migrationsRun).toBe(false);
    });

    it('should return false when DATABASE_MIGRATIONS_RUN is not set', async () => {
      delete process.env.DATABASE_MIGRATIONS_RUN;
      const config = await databaseConfig();
      expect(config.migrationsRun).toBe(false);
    });
  });

  describe('synchronize', () => {
    it('should return the value of DATABASE_SYNCHRONIZE as a boolean', async () => {
      process.env.DATABASE_SYNCHRONIZE = 'true';
      const config = await databaseConfig();
      expect(config.synchronize).toBe(true);
    });

    it('should return false when DATABASE_SYNCHRONIZE is an empty', async () => {
      process.env.DATABASE_SYNCHRONIZE = '';
      const config = await databaseConfig();
      expect(config.synchronize).toBe(false);
    });

    it('should return false when DATABASE_SYNCHRONIZE is not set', async () => {
      delete process.env.DATABASE_SYNCHRONIZE;
      const config = await databaseConfig();
      expect(config.synchronize).toBe(false);
    });
  });

  describe('maxConnections', () => {
    it('should return the value of DATABASE_MAX_CONNECTIONS as a number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '10';
      const config = await databaseConfig();
      expect(config.maxConnections).toBe(10);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is an empty', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is not a number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = 'invalid';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is a negative number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '-10';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });
});
