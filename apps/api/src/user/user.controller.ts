import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto, IUserController, UpdateUserDto } from "@nice-dtos/models";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly service: UserService) { }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Post()
  post(@Body() dto: CreateUserDto) {
    return this.service.post(dto)
  }

  @Put(":id")
  put(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.put(id, dto)
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.service.delete(id)
  }
}