import { Injectable } from '@nestjs/common';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';

@Injectable()
export class AttributesService {
  create(data: CreateAttributeDto) {
    return `This action adds a new attribute ${data}`;
  }

  findAll() {
    return `This action returns all attributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, changes: UpdateAttributeDto) {
    return `This action updates a #${id} attribute ${changes}`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
