import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Person } from './baseModel';
import { Client } from './client.entity';

@Entity('bankers')
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10
  })
  employeeId: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: 'banker_clients',
    joinColumn: {
      name: 'bankerId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'clientId',
      referencedColumnName: 'id'
    }
  })
  clients: Client[];

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
}
