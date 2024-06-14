import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { UUID } from 'crypto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las marcas' })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una marca por id' })
  get(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.brandService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva marca' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifica una marca por id' })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una marca por id' })
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.brandService.remove(id);
  }
}
