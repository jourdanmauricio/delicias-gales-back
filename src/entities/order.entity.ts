import { OrderStatus } from 'src/models/orderStatus.enum';
import { PaymentMethod } from 'src/models/paymentMethods.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.ACTIVE })
  status: OrderStatus;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  delivery_date: Date;

  @Column()
  delivery_user: string;

  @Column()
  total: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.EFECTIVO,
  })
  payment_method: PaymentMethod;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({ nullable: true })
  observation: string;

  @Column()
  nro_factura: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
