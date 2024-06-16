import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/entities/brand.entity';
import { UUID } from 'crypto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    //return this.brandRepository.find();
    const brands = await this.brandRepository
      .createQueryBuilder('brand')
      .leftJoin('brand.products', 'product')
      .groupBy('brand.id')
      .select(['brand.id, brand.name'])
      .addSelect('COUNT(product.id)', 'productCount')
      .getRawMany();
    return brands;
  }

  async findOne(id: UUID) {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!brand) throw new NotFoundException('category not found');
    return brand;
  }

  async findOneByName(name: string) {
    const brand = await this.brandRepository.findOneBy({ name });
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);
    return this.brandRepository.save(newBrand);
  }

  async update(id: UUID, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, changes);
    return this.brandRepository.save(brand);
  }

  remove(id: UUID) {
    return this.brandRepository.delete(id);
  }
}
