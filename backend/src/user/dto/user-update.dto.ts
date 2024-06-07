import { IsNumber, isNumber, IsString, isString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  lastname: string;
  @IsString()
  firstname: string;
  @IsString()
  email: string;
}
