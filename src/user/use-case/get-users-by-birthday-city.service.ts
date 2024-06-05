import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class GetUsersByBirthdayCityService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async getUsersByBirthdayCity(birthdayCity: string) {
    return await this.userRepository.findBy({ birthdayCity: birthdayCity });
  }
}