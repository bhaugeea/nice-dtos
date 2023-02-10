import { GetUserDto, CreateUserDto, UpdateUserDto } from "../entities";

export interface IUserController {
  getAll: () => Promise<GetUserDto[]>,
  getOne: (id: number | string) => Promise<GetUserDto>,
  post: (dto: CreateUserDto) => Promise<GetUserDto>
  put: (id: number | string, dto: UpdateUserDto) => Promise<GetUserDto>
  delete: (id: number | string) => Promise<void>
}