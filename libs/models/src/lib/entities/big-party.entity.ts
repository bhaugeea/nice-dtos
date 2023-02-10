import { OmitType } from "@nice-dtos/mapped-types";
import { IsDate, IsIn, IsString, MinLength } from "class-validator";
import { Column, Entity } from "typeorm";
import { IBigParty } from "./interfaces/big-party.interface";
import { createDtoOmit, EntityBase, getDtoOmit, updateDtoOmit } from "../utils/entity-base.entity";
import { Type } from "class-transformer";

@Entity()
export class BigParty extends EntityBase implements IBigParty {
  @Type(() => Date)
  @IsDate({ message: ({ value }) => `Please supply a valid start date. ${value} is not a date object.` })
  @Column()
  start: Date

  @IsString({ message: "The name needs to be a string." })
  @MinLength(3, { message: "The name needs to be at least 3 characters" })
  name: string;

  @IsIn([true], { message: "All parties are required to have pizza. Please indicate that the party has pizza." })
  hasPizza: true;
}

export class GetBigPartyDto extends OmitType(BigParty, getDtoOmit) { }
export class UpdateBigPartyDto extends OmitType(BigParty, updateDtoOmit) { }
export class CreateBigPartyDto extends OmitType(BigParty, createDtoOmit) { }