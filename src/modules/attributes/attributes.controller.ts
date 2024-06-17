import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { UUID } from 'crypto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get()
  findAll() {
    return this.attributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.attributesService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateAttributeDto) {
    return this.attributesService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifica un atributo por id' })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateAttributeDto,
  ) {
    console.log('id', id, 'changes', changes);
    return this.attributesService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.attributesService.remove(id);
  }
}
