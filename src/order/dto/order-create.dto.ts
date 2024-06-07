import { ArrayMaxSize, IsNumber, IsObject, IsPositive, IsString, MinLength } from 'class-validator';

export class OrderCreateDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}