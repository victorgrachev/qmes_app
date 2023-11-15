import { User } from '@supabase/supabase-js';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = randomBytes(16);
let key = null;

export const initSecrets = (user: User) => {
  key = scryptSync(user.id, 'salt', 32);
};

export const encrypt = (value: string) => {
  const cipher = createCipheriv(algorithm, key, iv);

  let result = cipher.update(String(value), 'utf-8', 'hex');
  result += cipher.final('hex');

  return result;
};

export const decrypt = (value: string) => {
  const decipher = createDecipheriv(algorithm, key, iv);

  let result = decipher.update(value, 'hex', 'utf8');
  result += decipher.final('utf8');

  return Number(result);
};
