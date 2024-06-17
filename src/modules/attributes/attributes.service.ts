import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async findOneByName(name: string) {
    const attribute = await this.attributeRepository.findOneBy({ name });
    return attribute;
  }

  async findAll() {
    const attributes = await this.attributeRepository.find();
    return attributes;
  }

  async findOne(id: UUID) {
    const attribute = await this.attributeRepository.findOneBy({ id });
    if (!attribute) throw new NotFoundException('Atributo no encontrado');
    return attribute;
  }

  async create(data: CreateAttributeDto) {
    const attribute = await this.findOneByName(data.name);
    if (attribute) throw new BadRequestException('El atributo ya existe');

    const newAttibuto = this.attributeRepository.create(data);
    return await this.attributeRepository.save(newAttibuto);
  }

  async update(id: UUID, changes: UpdateAttributeDto) {
    const attribute = await this.findOne(id);
    this.attributeRepository.merge(attribute, changes);
    return this.attributeRepository.save(attribute);
  }

  async remove(id: UUID) {
    await this.findOne(id);
    await this.attributeRepository.delete(id);
    return { id };
  }
}
