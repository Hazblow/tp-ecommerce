import { IsNumber, isNumber, IsString, isString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  lastname: string;
  @IsString()
  firstname: string;
  @IsString()
  password: string;
  @IsNumber()
  age: number;
  @IsString()
  birthdayCity: string;
  @IsString()
  email: string;
}
