import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class GetUserByIdService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async getOneUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}