export function encodeCursor(value: unknown): string {
  if (value === null || value === undefined) {
    throw new Error('Cannot encode null or undefined cursor value');
  }

  if (value instanceof Date) {
    return Buffer.from(value.getTime().toString()).toString('base64');
  }

  if (typeof value === 'object' && value !== null && 'toJSON' in value) {
    const jsonValue = (value as { toJSON: () => unknown }).toJSON();
    return Buffer.from(JSON.stringify(jsonValue)).toString('base64');
  }

  return Buffer.from(String(value)).toString('base64');
}

export function decodeCursor(value: string): unknown {
  try {
    const decoded = Buffer.from(value, 'base64').toString();
    try {
      return JSON.parse(decoded);
    } catch {
      return decoded;
    }
  } catch {
    throw new Error('Invalid cursor format');
  }
}
