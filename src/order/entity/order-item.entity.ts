import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { Order } from './order.entity';
import { Product } from '../../product/entity/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'int'})
  quantity: number;

  @Column({ type: 'int'})
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  constructor(data: OrderCreateDto, product: Product) {
    if (data) {
      this.product = product;
      this.quantity = data.quantity;
      this.price = product.price;
    }
  }
}
