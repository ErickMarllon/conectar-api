export enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortBy {
  CREATED_AT = 'created_at',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'email',
  UPDATED_AT = 'updated_at',
  LAST_LOGIN_AT = 'last_login_at',
  ROLE = 'role',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum AuthProvider {
  GOOGLE = 'google',
  META = 'meta',
  JWT = 'jwt',
  JWT_REFRESH = 'jwt-refresh',
}

export enum AccessTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
