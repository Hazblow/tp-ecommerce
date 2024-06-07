import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class GetUserByEmailService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }
}