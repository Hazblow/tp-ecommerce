import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { Order } from '../../order/entity/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' , nullable: true})
  age: number;

  @Column({ type: 'varchar' , nullable: true})
  birthdayCity: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @OneToMany(() => Order, order => order.customer, { nullable: true, cascade: true })
  orders: Order[];

  constructor(data: UserCreateDto) {
    if (data) {
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.password = null;
      this.age = data.age;
      this.birthdayCity = data.birthdayCity;
      this.email = data.email;
    }
  }
}
