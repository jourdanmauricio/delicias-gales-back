import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  async create(data: CreateAttributeDto) {
    const attribute = await this.findOneByName(data.name);
    if (attribute) throw new BadRequestException('El atributo ya existe');

    const newAttibuto = this.attributeRepository.create(data);
    return await this.attributeRepository.save(newAttibuto);
  }

  update(id: number, changes: UpdateAttributeDto) {
    return `This action updates a #${id} attribute ${changes}`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
