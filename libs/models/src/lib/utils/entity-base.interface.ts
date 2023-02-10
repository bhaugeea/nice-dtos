import type { IUser } from '../entities/interfaces/user.interface';

export interface IEntityBase {
  id: number;
  created?: Date;
  updated?: Date;
  deleted?: Date;
  createdBy?: IUser;
  updatedBy?: IUser;
  deletedBy?: IUser;
  createdById?: IUser['id'];
  updatedById?: IUser['id'];
  deletedById?: IUser['id'];
}
