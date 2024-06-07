import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
export class UpdateShippingOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async updateShipping(id: number, data : OrderUpdateShippingDto) {
    const order = await this.orderRepository.findOneBy({ id });
    order.updateShipping(data);
    console.log(order);
    return await this.orderRepository.save(order);
  }
}