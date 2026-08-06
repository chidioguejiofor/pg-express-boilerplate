import dbConfig from "./db/config";

const DATABASE_CONFIG = {
  ...dbConfig,
};

type DATABASE_ENVS = keyof typeof DATABASE_CONFIG;
const APP_ENV = (process.env.NODE_ENV as DATABASE_ENVS) || "development";

export const SEQUELIZE_CONFIG = DATABASE_CONFIG[APP_ENV];
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "";
export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET as string;

export const REDIS_URL = process.env.REDIS_URL as string;
export const MICROSOFT_TENANT_ID = process.env.MICROSOFT_TENANT_ID;

// The OAuth client ID our app is registered under for each network - a
// decoded token's `aud` claim must match this, otherwise it was issued for a
// different application and must be rejected.
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || "";

// Optional allowlist gating who can log in (e.g. for a private beta). Empty
// means no restriction.
export const ALLOWED_LOGIN_EMAILS = (process.env.ALLOWED_LOGIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

export const JWT_TOKEN_SETTINGS = {
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET as string,
  accessTokenDuration: +(
    process.env.ACCESS_TOKEN_EXP_TIME_IN_SECONDS || 5 * 60
  ),
  refreshTokenDuration: +(
    process.env.REFRESH_TOKEN_EXPIRY_TIME || 365.25 * 24 * 60 * 60
  ),
};
