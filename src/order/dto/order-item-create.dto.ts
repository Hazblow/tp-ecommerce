import { IsInt, IsNumber, IsObject, IsPositive, IsString, MinLength, ValidateNested } from 'class-validator';
import { Product } from '../../product/entity/product.entity';
import { Type } from 'class-transformer';

export class OrderItemCreateDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}