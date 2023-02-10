import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateBigPartyDto, IBigPartyController, UpdateBigPartyDto } from "@nice-dtos/models";
import { BigPartyService } from "./big-party.service";

@ApiTags('BigParty')
@Controller('big-parties')
export class BigPartyController implements IBigPartyController {
  constructor(private readonly service: BigPartyService) { }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Post()
  post(@Body() dto: CreateBigPartyDto) {
    return this.service.post(dto)
  }

  @Put(":id")
  put(@Param('id') id: number, @Body() dto: UpdateBigPartyDto) {
    return this.service.put(id, dto)
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.service.delete(id)
  }
}