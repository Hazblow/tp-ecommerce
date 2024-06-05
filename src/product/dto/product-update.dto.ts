import { IsString, isString } from 'class-validator';

export class ProductUpdateDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  author: string;
}
