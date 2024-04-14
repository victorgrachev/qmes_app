// import { Injectable } from '@nestjs/common';
// import {
//   createCipheriv,
//   createDecipheriv,
//   randomBytes,
//   scryptSync,
// } from 'crypto';
// import { User } from 'src/user/entities/user.entity';

// @Injectable()
// export class EncryptService {
//   private getCipher(user: User) {
//     const algorithm = 'aes-256-ctr';
//     const iv = randomBytes(16);
//     const key = scryptSync(String(user.id), 'salt', 32);

//     return createCipheriv(algorithm, key, iv);
//   }

//   private getDecipher(user: User) {
//     const algorithm = 'aes-256-ctr';
//     const iv = randomBytes(16);
//     const key = scryptSync(String(user.id), 'salt', 32);

//     return createDecipheriv(algorithm, key, iv);
//   }

//   encrypt(value: number) {
//     let result = this.getCipher().update(String(value), 'utf-8', 'hex');
//     result += this.getCipher().final('hex');

//     return result;
//   }

//   decrypt = (value: string) => {
//     let result = this.getDecipher().update(value, 'hex', 'utf8');
//     result += this.getDecipher().final('utf8');

//     return Number(result);
//   };
// }
