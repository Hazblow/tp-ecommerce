import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { Order } from './entity/order.entity';
import { PayOrderService } from './use-case/pay-order.service';
import { UpdateInvoiceAddressOrderService } from './use-case/update-invoice-address-order.service';
import { UpdateShippingOrderService } from './use-case/update-shipping-order.service';
import { OrderItem } from './entity/order-item.entity';
import { GetUserByIdService } from '../user/use-case/get-user-by-id.service';
import { User } from '../user/entity/user.entity';
import { GetProductByIdService } from '../product/use-case/get-product-by-id.service';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderItem,User,Product])],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    PayOrderService,
    UpdateShippingOrderService,
    UpdateInvoiceAddressOrderService,
    GetUserByIdService,
    GetProductByIdService
  ],
})
export class OrderModule {
}
