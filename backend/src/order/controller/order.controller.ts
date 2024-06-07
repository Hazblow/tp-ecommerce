import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { AddToCartService } from '../use-case/add-to-cart.service';
import { OrderCreateDto } from '../dto/order-create.dto';
import { PayOrderService } from '../use-case/pay-order.service';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { UpdateShippingOrderService } from '../use-case/update-shipping-order.service';
import { UpdateInvoiceAddressOrderService } from '../use-case/update-invoice-address-order.service';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import { GetCurrentCustomerOrderService } from '../use-case/get-current-customer-order.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly addToCartService: AddToCartService,
    private readonly payOrderService: PayOrderService,
    private readonly updateShippingOrderService: UpdateShippingOrderService,
    private readonly updateInvoiceAddressOrderService: UpdateInvoiceAddressOrderService,
    private readonly getCurrentCustomerOrderService: GetCurrentCustomerOrderService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard)
  addToCart(@Body() data: OrderCreateDto,  @CurrentUser() currentUserId: number) {
    return this.addToCartService.addToCart(data, currentUserId);
  }

  @Put(':id/pay')
  @UseGuards(AuthGuard)
  updatePayOrder(@Param('id', ParseIntPipe) id: number) {
    return this.payOrderService.payOrder(id);
  }

  @Put(':id/shipping')
  @UseGuards(AuthGuard)
  updateShippingAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateShippingDto
  ) {
    return this.updateShippingOrderService.updateShipping(id, data);
  }

  @Put(':id/invoice-address')
  @UseGuards(AuthGuard)
  updateInvoiceAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateInvoiceAddressDto
  ) {
    return this.updateInvoiceAddressOrderService.updateInvoiceAddress(id, data);
  }

  @UseGuards(AuthGuard)
  @Get('/current')
  getCurrentUserOrder(
    @CurrentUser() currentUser: any
  ) {
    return this.getCurrentCustomerOrderService.get(currentUser);
  }
}
