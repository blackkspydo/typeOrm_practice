import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  amount: number;

  @Column({
    nullable: false
  })
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => Client, (client) => client.transactions)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
