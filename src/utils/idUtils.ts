import { v4 as uuidv4, validate, version } from 'uuid';

export const isValidId = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};

export const genId = (): string => uuidv4();
