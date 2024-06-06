import {
  Body,
  Controller, Get, Param, ParseIntPipe,
  Post, Put,
} from '@nestjs/common';
import { CreateUserService } from '../use-case/create-user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { GetAllUsersService } from '../use-case/get-all-users.service';
import { GetUserByIdService } from '../use-case/get-user-by-id.service';
import { UpdateUserService } from '../use-case/update-user.service';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserPasswordUpdateDto } from '../dto/user-password-update.dto';
import { UpdateUserPasswordService } from '../use-case/update-user-password.service';
import { GetUserByEmailService } from '../use-case/get-user-by-email.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {}

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }

  @Get()
  getAllUsers() {
    return this.getAllUsersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdService.getOneUserById(id);
  }

  @Get('by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.getUserByEmailService.getUserByEmail(email);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDto) {
    return this.updateUserService.updateUser(id, data);
  }

  @Put(':id/password')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() password: UserPasswordUpdateDto
  ) {
    return this.updateUserPasswordService.updateUserPassword(id, password);
  }

}