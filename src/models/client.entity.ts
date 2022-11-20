import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { Banker } from './bankers.entity';
import { Person } from './baseModel';
import { Transaction } from './transaction.entity';
@Entity('clients')
export class Client extends Person {
  @Column({
    type: 'numeric'
  })
  balance: number;

  @Column({
    default: true
  })
  isActive: boolean;

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true
  })
  deletedAt: Date;

  @Column({
    type: 'simple-json',
    nullable: true
  })
  additionalInfo: {
    address: string;
    city: string;
    state: string;
    zip: number;
  };

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @Column({
    type: 'simple-array',
    nullable: true
  })
  currencies: string[];

  constructor(client: Partial<Client>) {
    super();
    Object.assign(this, client);
  }
}

