import { OmitType } from "@nestjs/swagger";
import { BigParty, CreateBigPartyDto, CreateUserDto, GetBigPartyDto, GetUserDto, IBigPartyController, IUserController, UpdateBigPartyDto, UpdateUserDto } from "@nice-dtos/models";
import { Loader } from "@tanstack/react-loaders";
import axios, { AxiosResponse } from "axios";
import { ClassConstructor, plainToInstance } from "class-transformer";

const client = axios.create({ baseURL: 'http://localhost:3333/api' })

const t = {
  "id": 1,
  "created": "2023-02-07T22:03:31.000Z",
  "updated": "2023-02-07T22:03:31.000Z",
  "deleted": null,
  "createdById": null,
  "updatedById": null,
  "deletedById": null,
  "start": "2023-02-07T21:58:44.941Z"
}

class T extends BigParty { }
class B extends OmitType(BigParty, []) { }

console.log(plainToInstance(BigParty, t), plainToInstance(GetBigPartyDto, t), plainToInstance(B, t), plainToInstance(T, t));



async function deserialize<T>(res: Promise<AxiosResponse>, dto: ClassConstructor<T>): Promise<T>
async function deserialize<T>(res: Promise<AxiosResponse>, dto: ClassConstructor<T>[]): Promise<T[]>
async function deserialize<T>(res: Promise<AxiosResponse>, dto: ClassConstructor<T> | ClassConstructor<T>[]) {
  const response = await res
  if (Array.isArray(dto)) {
    return plainToInstance(dto[0], response.data)
  } else {
    return plainToInstance(dto, response.data)
  }
}

const userController: IUserController = {
  getAll: () => deserialize(client.get('/users'), [GetUserDto]),
  getOne: (id) => deserialize(client.get(`/users/${id}`), GetUserDto),
  post: (dto: CreateUserDto) => deserialize(client.post('/users', dto), GetUserDto),
  put: (id, dto: UpdateUserDto) => deserialize(client.put(`/users/${id}`, dto), GetUserDto),
  delete: (id) => client.post(`/users/${id}`),
}

const bigPartyController: IBigPartyController = {
  getAll: () => deserialize(client.get('/big-parties'), [GetBigPartyDto]),
  getOne: (id) => deserialize(client.get(`/big-parties/${id}`), GetBigPartyDto),
  post: (dto: CreateBigPartyDto) => deserialize(client.post('/big-parties', dto), GetBigPartyDto),
  put: (id, dto: UpdateBigPartyDto) => deserialize(client.put(`/big-parties/${id}`, dto), GetBigPartyDto),
  delete: (id) => client.post(`/big-parties/${id}`),
}

export const bigPartiesLoader = new Loader({
  key: "big-parties",
  loader: bigPartyController.getAll
})

export const bigPartyLoader = new Loader({
  key: "big-party",
  loader: (partyId: string | undefined) => partyId === undefined ? undefined : bigPartyController.getOne(partyId)
})

export const usersLoader = new Loader({
  key: 'users',
  loader: userController.getAll
})

export const userLoader = new Loader({
  key: 'user',
  loader: (userId: string | undefined) => userId === undefined ? undefined : userController.getOne(userId)
})