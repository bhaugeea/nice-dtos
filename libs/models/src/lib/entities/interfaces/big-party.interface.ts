import { IEntityBase } from "../../utils/entity-base.interface";

export interface IBigParty extends IEntityBase {
  start: Date;
  name: string;
  hasPizza: true;
}