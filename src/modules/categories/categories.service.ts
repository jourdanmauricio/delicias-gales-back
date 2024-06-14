import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const categoryDB = await this.findOneByName(data.name);
    if (categoryDB) throw new BadRequestException('La categoría ya existe');

    const category = this.categoryRepository.create(data);
    const newCategory = await this.categoryRepository.save(category);
    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: UUID) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new BadRequestException('La categoría no existe');
    return category;
  }

  async findOneByName(name: string) {
    const category = await this.categoryRepository.findOneBy({ name });
    return category;
  }

  async update(id: UUID, changes: UpdateCategoryDto) {
    const categoryDb = await this.findOne(id);

    const category = this.categoryRepository.merge(categoryDb, changes);
    const newCategory = await this.categoryRepository.save(category);

    return newCategory;
  }

  async remove(id: UUID) {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
    return id;
  }
}
