import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigParty } from '@nice-dtos/models'
import { BigPartyController } from './big-party.controller';
import { BigPartyService } from './big-party.service';

@Module({
  imports: [TypeOrmModule.forFeature([BigParty])],
  providers: [BigPartyService],
  controllers: [BigPartyController]
})
export class BigPartyModule { }
