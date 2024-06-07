import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { GetUserByIdService } from '../../user/use-case/get-user-by-id.service';
import { GetProductByIdService } from '../../product/use-case/get-product-by-id.service';
import { Product } from '../../product/entity/product.entity';
import { User } from '../../user/entity/user.entity';

export class AddToCartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  async addToCart(data: OrderCreateDto, currentUserId: number) {
    try {
      //si une order est trouvé pour le currentUser connecté au statut Order.OrderStatus.CREATED, on update la quantité
      const findOrder = await this.findOrder(currentUserId);
      const findProduct = await this.findProduct(data.productId);
      const customer = await this.getCurrentCustomer(currentUserId);
      return await this.saveOrder(findOrder, data, customer, findProduct);
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
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  }

  private async saveOrder(order : Order, data: OrderCreateDto, currentUser: User, product: Product)
  {
    if (order) {
      await order.addOrderItemToCart(data, product, false);
    } else {
      //sinon on en crée une nouvelle
      order = new Order(data, currentUser);
      await order.addOrderItemToCart(data, product, true);
    }
    return await this.orderRepository.save(order);
  }

  private async getCurrentCustomer(currentUserId: number) {
    return await this.userRepository.findOneBy({ id: currentUserId });
  }
}