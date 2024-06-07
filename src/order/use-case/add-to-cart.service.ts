import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { GetUserByIdService } from '../../user/use-case/get-user-by-id.service';
import { GetProductByIdService } from '../../product/use-case/get-product-by-id.service';
import { Product } from '../../product/entity/product.entity';

export class AddToCartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly getProductByIdService: GetProductByIdService,
    private readonly getUserByIdService: GetUserByIdService,
  ) {
  }

  async addToCart(data: OrderCreateDto, currentUserId: number) {
    try {
      //si une order est trouvé pour le currentUser connecté au statut Order.OrderStatus.CREATED, on update la quantité
      let findOrder = await this.findOrder(currentUserId);
      let findProduct = await this.findProduct(data.productId);
      return await this.saveOrder(findOrder, data, currentUserId, findProduct);
    } catch (error) {
      throw new Error('Error while creating order');
    }
  }

  private async findOrder(currentUserId : number) {
    return await this.orderRepository.findOne({
      where: {
        customer: { id: currentUserId },
        status: Order.OrderStatus.CREATED
      },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  private async findProduct(productId: number): Promise<Product> {
    const product = await this.getProductByIdService.getOneProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  }

  private async saveOrder(order : Order, data: OrderCreateDto, currentUser: any, product: Product) {
    if (order) {
      await order.addOrderItemToCart(data, product);
    } else {
      //sinon on en crée une nouvelle
      let order = new Order(data, currentUser);
      await order.addOrderItemToCart(data, product);
    }
    return await this.orderRepository.save(order);
  }
}