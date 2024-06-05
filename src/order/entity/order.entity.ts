import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { OrderItem } from './order-item.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' , nullable: true})
  updatedAt: Date;

  @ManyToOne(() => User, customer => customer.orders)
  customer: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'date' , nullable: true})
  paidAt: Date;

  @Column({ type: 'varchar', nullable: true })
  shippingAddress: string;

  @Column({ type: 'varchar', nullable: true })
  shippingMethod: string;

  @Column({ type: 'varchar', nullable: true })
  invoiceAddress: string;

  @Column({ type: 'date', nullable: true })
  shippingMethodSetAt: Date;

  @Column({ type: 'date', nullable: true })
  invoiceAddressSetAt: Date;

  static OrderStatus = {
    CREATED: 'Créée',
    PAID: 'Payée',
    CANCELED: 'Annulée'
  }


  constructor(data: OrderCreateDto, customer: User) {
    if (data) {
      this.customer = customer;
      this.createdAt = new Date();
      this.updatedAt = null;
      this.status = Order.OrderStatus.CREATED;
      this.total = 0;
      this.paidAt = null;
      this.shippingAddress = null;
      this.shippingMethod = null;
      this.invoiceAddress = null;
      this.shippingMethodSetAt = null;
      this.invoiceAddressSetAt = null;
    }
  }

  pay() {
    this.paidAt = new Date();
    this.status = Order.OrderStatus.PAID;
    this.updatedAt = new Date();
  }

  updateInvoiceAddress(data: OrderUpdateInvoiceAddressDto) {
    this.invoiceAddress = data.invoiceAddress;
    this.invoiceAddressSetAt = new Date();
    this.updatedAt = new Date();
  }

  updateShipping(data: OrderUpdateShippingDto) {
    this.shippingAddress = data.shippingAddress;
    this.shippingMethod = data.shippingMethod;
    this.shippingMethodSetAt = new Date();
    this.updatedAt = new Date();
    if (!this.invoiceAddress) {
      this.invoiceAddress = this.shippingAddress;
      this.invoiceAddressSetAt = new Date();
    }
  }
}
