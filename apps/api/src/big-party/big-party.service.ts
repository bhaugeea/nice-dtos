import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBigPartyDto, GetBigPartyDto, UpdateBigPartyDto, BigParty } from '@nice-dtos/models';
import { Repository } from 'typeorm';

@Injectable()
export class BigPartyService {
  constructor(
    @InjectRepository(BigParty)
    private bigPartyRepository: Repository<BigParty>
  ) { }

  async getAll() {
    const res = await this.bigPartyRepository.find();
    return res
  }

  getOne(id: number) {
    return this.bigPartyRepository.findOneByOrFail({ id }).then(result => new GetBigPartyDto(result))
  }

  post(dto: CreateBigPartyDto) {
    return this.bigPartyRepository.save(this.bigPartyRepository.create(dto))
  }

  async put(id: number, dto: UpdateBigPartyDto) {
    const entity = await this.bigPartyRepository.findOneByOrFail({ id })
    const update: BigParty = { ...entity, ...dto }
    return await this.bigPartyRepository.save(update)
  }

  delete(id: number) {
    return this.bigPartyRepository.softDelete(id).then(() => undefined)
  }
}
