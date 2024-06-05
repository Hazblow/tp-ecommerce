import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { HashPasswordService } from '../utils/hash-password.service';

export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async createUser(data: UserCreateDto) {
    try {
      const user = new User(data);
      user.password = await this.hashPasswordService.hashPassword(data.password);
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}
