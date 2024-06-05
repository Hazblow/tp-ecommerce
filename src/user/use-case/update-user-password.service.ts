import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { HashPasswordService } from '../utils/hash-password.service';
import { UserPasswordUpdateDto } from '../dto/user-password-update.dto';

export class UpdateUserPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashPasswordService: HashPasswordService,
  ) {
  }

  async updateUserPassword(id: number, data: UserPasswordUpdateDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      user.password = await this.hashPasswordService.hashPassword(data.password);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error while updating user password');
    }
  }
}