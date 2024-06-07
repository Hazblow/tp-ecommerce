import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controller/order.controller';
import { AddToCartService } from './use-case/add-to-cart.service';
import { Order } from './entity/order.entity';
import { PayOrderService } from './use-case/pay-order.service';
import { UpdateInvoiceAddressOrderService } from './use-case/update-invoice-address-order.service';
import { UpdateShippingOrderService } from './use-case/update-shipping-order.service';
import { OrderItem } from './entity/order-item.entity';
import { GetUserByIdService } from '../user/use-case/get-user-by-id.service';
import { User } from '../user/entity/user.entity';
import { GetProductByIdService } from '../product/use-case/get-product-by-id.service';
import { Product } from '../product/entity/product.entity';
import { GetCurrentCustomerOrderService } from './use-case/get-current-customer-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderItem,User,Product])],
  controllers: [OrderController],
  providers: [
    AddToCartService,
    PayOrderService,
    UpdateShippingOrderService,
    UpdateInvoiceAddressOrderService,
    GetCurrentCustomerOrderService
  ],
})
export class OrderModule {
}
