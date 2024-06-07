import { IsString, isString } from 'class-validator';

export class OrderUpdateInvoiceAddressDto {
  @IsString()
  invoiceAddress: string;
}