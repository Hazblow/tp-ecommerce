import { ArrayMaxSize, IsObject, IsString, MinLength } from 'class-validator';
import { OrderItemCreateDto } from './order-item-create.dto';

export class OrderCreateDto {
  @IsObject({ each: true })
  items: OrderItemCreateDto[];
}