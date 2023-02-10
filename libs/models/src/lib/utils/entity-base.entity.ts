import { Exclude, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import type { IUser } from '../entities/interfaces/user.interface';
import type { IEntityBase } from './entity-base.interface';

export class EntityBase implements IEntityBase {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @Type(() => Date)
  @CreateDateColumn()
  created: Date;

  @Type(() => Date)
  @UpdateDateColumn()
  updated?: Date;

  @Type(() => Date)
  @DeleteDateColumn()
  deleted?: Date;

  @Exclude()
  @ManyToOne('User', { nullable: true })
  createdBy?: IUser;

  @Column({ nullable: true })
  createdById?: IUser['id'];

  @Exclude()
  @ManyToOne('User', { nullable: true })
  updatedBy?: IUser;

  @Column({ nullable: true })
  updatedById?: IUser['id'];

  @Exclude()
  @ManyToOne('User', { nullable: true })
  deletedBy?: IUser;

  @Column({ nullable: true })
  deletedById?: IUser['id'];
}
export const getDtoOmit: Array<keyof EntityBase> = ['createdBy', 'deletedBy', 'updatedBy']
export const createDtoOmit: Array<keyof EntityBase> = ['id', 'created', 'createdBy', 'createdById', 'deleted', 'deletedBy', 'deletedById', 'updated', 'updatedBy', 'updatedById']
export const updateDtoOmit: Array<keyof EntityBase> = ['id', 'created', 'createdBy', 'createdById', 'deleted', 'deletedBy', 'deletedById', 'updated', 'updatedBy', 'updatedById']