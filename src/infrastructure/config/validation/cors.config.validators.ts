export function getCorsOrigin(
  origin: string,
  callback: (err: Error | null, allow?: boolean) => void,
) {
  const corsEnv = process.env.APP_CORS_ORIGIN;
  const origins = [origin, '*', 'true'];
  for (const o of origins) {
    if (corsEnv?.includes(o)) {
      return callback(null, true);
    }
  }

  return callback(new Error('Not allowed by CORS'), false);
}
