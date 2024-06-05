import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './use-case/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { jwtConstants } from './auth.constants';
import { GetUserByEmailService } from '../user/use-case/get-user-by-email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { HashPasswordService } from '../user/utils/hash-password.service';
import { ComparePasswordService } from '../user/utils/compare-password.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService, GetUserByEmailService, ComparePasswordService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}