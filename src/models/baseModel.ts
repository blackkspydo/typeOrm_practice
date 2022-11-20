import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import * as Validator from 'class-validator';
@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 60)
  @Validator.Matches(/^[a-zA-Z]+$/)
  firstName: string;

  @Column()
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 60)
  @Validator.Matches(/^[a-zA-Z]+$/)
  lastName: string;

  @Column({
    unique: true
  })
  @Validator.IsNotEmpty()
  @Validator.IsEmail()
  @Validator.Length(5, 100)
  email: string;

  @Column({
    unique: true,
    length: 10
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 10)
  @Validator.Matches(/^[0-9]+$/)
  cardNumber: string;
}
