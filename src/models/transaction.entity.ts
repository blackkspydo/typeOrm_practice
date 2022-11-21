import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Client } from "./client.entity";
import * as Validator from "class-validator";

const TransactionType = ["deposit", "withdrawal", "transfer"];
@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.Min(10, {
    message: "Amount must be greater than 10"
  })
  @Validator.Max(1000000, {
    message: "Amount must be less than 1,000,000"
  })
  amount: number;

  @Column({
    nullable: false
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(TransactionType, {
    message: "Transaction type must be deposit, withdrawal or transfer"
  })
  type: string;

  @Column()
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MinLength(3, {
    message: "Description must be at least 3 characters long"
  })
  @Validator.MaxLength(100, {
    message: "Description must be at most 100 characters long"
  })
  description: string;

  @Column({
    type: Date
  })
  createdAt: Date;

  @ManyToOne(() => Client, (client) => client.transactions)
  @JoinColumn({ name: "clientId" })
  client: Client;

  constructor(transaction: Partial<Transaction>) {
    Object.assign(this, transaction);
  }
}
