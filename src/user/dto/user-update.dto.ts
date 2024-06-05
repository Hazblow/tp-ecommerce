import { IsNumber, isNumber, IsString, isString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  lastname: string;
  @IsString()
  firstname: string;
  @IsNumber()
  age: number;
  @IsString()
  birthdayCity: string;
  @IsString()
  email: string;
}
