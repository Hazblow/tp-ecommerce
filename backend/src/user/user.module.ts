import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './use-case/create-user.service';
import { User } from './entity/user.entity';
import { HashPasswordService } from './utils/hash-password.service';
import { HashPasswordServiceInterface } from './utils/hash-password.service.interface';
import { GetAllUsersService } from './use-case/get-all-users.service';
import { GetUserByIdService } from './use-case/get-user-by-id.service';
import { UpdateUserService } from './use-case/update-user.service';
import { UpdateUserPasswordService } from './use-case/update-user-password.service';
import { GetUserByEmailService } from './use-case/get-user-by-email.service';
import { ComparePasswordService } from './utils/compare-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    HashPasswordService,
    GetAllUsersService,
    GetUserByIdService,
    UpdateUserService,
    UpdateUserPasswordService,
    GetUserByEmailService,
    ComparePasswordService,
    // {
    //   provide: CreateUserService,
    //   useFactory: (passwordHasherService: HashPasswordServiceInterface) => {
    //     return new CreateUserService(passwordHasherService);
    //   },
    //   inject: [HashPasswordService],
    // },
  ],

})
export class UserModule {
}
