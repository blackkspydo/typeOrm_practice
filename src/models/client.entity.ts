import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany
} from "typeorm";
import { IsNumber, IsNotEmpty, IsBoolean, IsOptional, IsIn, IsArray, IsString } from "class-validator";
import { Banker } from "./bankers.entity";
import { Person } from "./baseModel";
import { Transaction } from "./transaction.entity";
import { CURRENCIES } from "../utils/constants";

@Entity("clients")
export class Client extends Person {
  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    default: 0
  })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @Column({
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true
  })
  deletedAt: Date;

  @Column({
    type: "simple-json",
    nullable: true
  })
  @IsOptional()
  additionalInfo: {
    address: string;
    city: string;
    state: string;
    zip: number;
  };

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @Column({
    type: "simple-array",
    nullable: true
  })
  @IsOptional()
  @IsArray()
  @IsString({
    each: true
  })
  @IsIn(CURRENCIES, {
    each: true
  })
  currencies: string[];

  constructor(client: Partial<Client>) {
    super();
    Object.assign(this, client);
  }
}
