import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';

@Entity('payments')
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ name: 'transaction_id' })
  transactionId: string;

  @Column({
    name: 'payment_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  paymentDate: Date;

  @Column()
  cuenta: number;

  @Column()
  amount: number;

  @Column()
  comision: number;

  @OneToMany(() => Order, (order) => order.payments)
  order: Order;
}
