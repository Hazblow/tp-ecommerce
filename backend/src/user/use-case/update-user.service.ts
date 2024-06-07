import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { HashPasswordService } from '../utils/hash-password.service';
import { UserUpdateDto } from '../dto/user-update.dto';

export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async updateUser(id: number, data: UserUpdateDto) {
    const user = await this.userRepository.findOneBy({ id });

    const userUpdate = { ...user, ...data };

    await this.userRepository.save(userUpdate);

    return userUpdate;
  }
}