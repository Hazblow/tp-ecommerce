import { IsString, isString } from 'class-validator';

export class OrderUpdateShippingDto {
  @IsString()
  shippingAddress: string;
  @IsString()
  shippingMethod: string;
}