type ParseTimeToMsInput = string | number;
type ParseTimeOutput = number;
type ParseTimeToMs = (input: ParseTimeToMsInput) => ParseTimeOutput;

type DataInputFormat = string | number | Date;
type NumberOutput = Date;
type DataType = (input?: DataInputFormat) => NumberOutput;

const durationFormatRegex = /^(\d+(?:\.\d+)?)(ms|s|m|h|d|w)$/i;

export const parseTimeToMs: ParseTimeToMs = (input) => {
  if (typeof input === 'number') return input;

  const match = durationFormatRegex.exec(input.trim());

  if (!match) {
    throw new Error(`Invalid time format: "${input}"`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  const unitMap: Record<string, number> = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  return value * unitMap[unit];
};

export const setupData: DataType = (input) => {
  if (input === undefined || input === null || !input) {
    return new Date(Date.now());
  }
  if (input instanceof Date) return input;
  if (typeof input === 'number') return new Date(input);
  if (typeof input === 'string' && !durationFormatRegex.exec(input.trim())) {
    return new Date(input);
  }

  const parseTime = parseTimeToMs(input);
  return new Date(Date.now() + parseTime);
};
