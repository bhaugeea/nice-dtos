import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, User } from '@nice-dtos/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  getAll() {
    return this.userRepository.find();
  }

  getOne(id: number) {
    return this.userRepository.findOneByOrFail({ id })
  }

  post(dto: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(dto))
  }

  async put(id: number, dto: UpdateUserDto) {
    const entity = await this.userRepository.findOneByOrFail({ id })
    const update: User = { ...entity, ...dto }
    return await this.userRepository.save(update)
  }

  delete(id: number) {
    return this.userRepository.softDelete(id).then(() => undefined)
  }
}
