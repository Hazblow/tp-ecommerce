import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { GetUserByIdService } from '../../user/use-case/get-user-by-id.service';
import { GetProductByIdService } from '../../product/use-case/get-product-by-id.service';

export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly getProductByIdService: GetProductByIdService,
  ) {
  }

  async createOrder(data: OrderCreateDto, currentUser: any) {
    //todo refacto try catch for better error control
    try {
      const order = new Order(data, currentUser);
      const orderItems = [];
      console.log(currentUser);

      for (const itemData of data.items) {
        const product = await this.getProductByIdService.getOneProductById(itemData.productId);
        if (!product) {
          throw new Error(`Product with ID ${itemData.productId} not found`);
        }

        const orderItem = new OrderItem(itemData, product);
        orderItems.push(orderItem);
        order.total += orderItem.price * orderItem.quantity;
      }

      order.items = orderItems;
      // console.log(order);
      return await this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }
}