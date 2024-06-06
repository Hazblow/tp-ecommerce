import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { Order } from '../../order/entity/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @OneToMany(() => Order, order => order.customer, { nullable: true, cascade: true })
  orders: Order[];

  constructor(data: UserCreateDto) {
    if (data) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.password = null;
      this.email = data.email;
    }
  }
}
