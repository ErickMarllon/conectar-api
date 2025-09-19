type Sub = {
  user_id: string;
  email: string;
  role: string;
  source: string;
  tenant: string;
};

export type Payload = {
  sub: Sub;
  iat?: number;
  exp?: number;
};

export type PayloadGenerateRes = {
  access_token: string;
  refresh_token: string;
  access_token_expires?: number;
  refresh_token_expires?: number;
};

export type PayloadInput = {
  access_token?: string;
  refresh_token?: string;
};
