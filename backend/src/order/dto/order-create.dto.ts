import { ArrayMaxSize, IsNumber, IsObject, IsPositive, IsString, MinLength } from 'class-validator';

export class OrderCreateDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}