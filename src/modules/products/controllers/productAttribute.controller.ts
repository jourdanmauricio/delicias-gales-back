import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateProductAttributeDto,
  UpdateProductAttributeDto,
} from '../dtos/productAttribute.dto';
import { ProductsAttributeService } from '../services/productAttribute.service';
import { UUID } from 'crypto';

@Controller('product-attributes')
export class ProductsAttributeController {
  constructor(private prodAttribService: ProductsAttributeService) {}

  @Post()
  create(@Body() data: CreateProductAttributeDto) {
    return this.prodAttribService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateProductAttributeDto,
  ) {
    return this.prodAttribService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.prodAttribService.remove(id);
  }
}
