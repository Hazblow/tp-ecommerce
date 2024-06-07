import * as bcrypt from 'bcrypt';
export class ComparePasswordService {
  async comparePassword(password: string, passwordToCompare : string) {
    return await bcrypt.compare(password, passwordToCompare);
  }
}