import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
export class UpdateInvoiceAddressOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async updateInvoiceAddress(id: number, data : OrderUpdateInvoiceAddressDto) {
    const order = await this.orderRepository.findOneBy({ id });
    order.updateInvoiceAddress(data);
    console.log(order);
    return await this.orderRepository.save(order);
  }
}