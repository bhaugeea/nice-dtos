// import { OmitType } from '@nestjs/swagger';
import { OmitType } from '@nice-dtos/mapped-types';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import type { IUser } from './interfaces/user.interface';
import { createDtoOmit, EntityBase, getDtoOmit, updateDtoOmit } from '../utils/entity-base.entity';

@Entity()
export class User extends EntityBase implements IUser {
  @IsString()
  @Column()
  username: string;
}
export class GetUserDto extends OmitType(User, getDtoOmit) { }
export class UpdateUserDto extends OmitType(User, updateDtoOmit) { }
export class CreateUserDto extends OmitType(User, createDtoOmit) { }