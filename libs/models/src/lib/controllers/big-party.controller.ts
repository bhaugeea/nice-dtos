import { GetBigPartyDto, CreateBigPartyDto, UpdateBigPartyDto } from "../entities";

export interface IBigPartyController {
  getAll: () => Promise<GetBigPartyDto[]>,
  getOne: (id: number | string) => Promise<GetBigPartyDto>,
  post: (dto: CreateBigPartyDto) => Promise<GetBigPartyDto>
  put: (id: number | string, dto: UpdateBigPartyDto) => Promise<GetBigPartyDto>
  delete: (id: number | string) => Promise<void>
}