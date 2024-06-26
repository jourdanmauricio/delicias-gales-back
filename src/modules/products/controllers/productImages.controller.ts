import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ProductImagesService } from '../services/productImages.service';
import { CreateProductImagesDto } from '../dtos/productImages.dto';
import { UUID } from 'crypto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private prodImagesService: ProductImagesService) {}

  @Post()
  create(@Body() data: CreateProductImagesDto) {
    return this.prodImagesService.create(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.prodImagesService.remove(id);
  }
}
