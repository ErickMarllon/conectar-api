import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
): T {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMsg = errors
      .map((error: ValidationError) => {
        const constraints = error.constraints;
        const details =
          constraints != null
            ? Object.entries(constraints)
                .map(([key, value]) => `+ ${key}: ${value}`)
                .join('\n')
            : '+ Unknown validation error';

        return `\nError in ${error.property}:\n${details}`;
      })
      .join('\n');

    console.error(`\n${errors.toString()}`);
    throw new Error(errorMsg);
  }

  return validatedConfig;
}

export default validateConfig;
