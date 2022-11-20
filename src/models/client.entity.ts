import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    unique: true,
    length: 10
  })
  cardNumber: string;

  @Column({
    type: 'numeric'
  })
  balance: number;

  @Column({
    default: true
  })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column({
    nullable: true
  })
  updatedAt: Date;

  @Column({
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
}
