import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Person } from "./baseModel";
import { Client } from "./client.entity";
import * as Validator from "class-validator";

@Entity("bankers")
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 10)
  @Validator.Matches(/^[0-9]+$/)
  employeeId: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: "banker_clients",
    joinColumn: {
      name: "bankerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "clientId",
      referencedColumnName: "id"
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

  constructor(banker: Partial<Banker>) {
    super();
    Object.assign(this, banker);
  }
}
