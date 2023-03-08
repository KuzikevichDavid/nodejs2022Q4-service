import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';

export const hash = async (password: string) =>
  bcryptHash(password, +process.env.CRYPT_SALT || 5);

export const compare = async (password: string, hash: string) =>
  bcryptCompare(password, hash);
