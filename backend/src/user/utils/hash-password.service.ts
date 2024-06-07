import * as bcrypt from 'bcrypt';
import { HashPasswordServiceInterface } from './hash-password.service.interface';

export class HashPasswordService implements HashPasswordServiceInterface {
  async hashPassword(password: string) {
    try {
      //hash password with bcrypt
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      console.log(error);
      throw new Error('Error while hashing password');
    }
  }
}