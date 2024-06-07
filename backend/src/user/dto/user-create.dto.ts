import { IsDate, IsNumber, isNumber, IsString, isString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  lastName: string;
  @IsString()
  firstName: string;
  @IsString()
  password: string;
  @IsString()
  email: string;
}
