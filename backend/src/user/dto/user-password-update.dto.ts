import { IsString, isString } from 'class-validator';

export class UserPasswordUpdateDto {
  @IsString()
  password : string;
}
