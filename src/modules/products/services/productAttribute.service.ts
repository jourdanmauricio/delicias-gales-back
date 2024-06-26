import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductAttributeDto,
  UpdateProductAttributeDto,
} from '../dtos/productAttribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { ProductAttribute } from 'src/entities/productAttributes.entity';
import { UUID } from 'crypto';

@Injectable()
export class ProductsAttributeService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
    @InjectRepository(ProductAttribute)
    private prodAttribRepository: Repository<ProductAttribute>,
  ) {}

  async findOne(id: UUID) {
    const user = await this.prodAttribRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Atributo no encontrado');

    return user;
  }

  async create(data: CreateProductAttributeDto) {
    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });
    const attribute = await this.attributeRepository.findOneBy({
      id: data.attributeId,
    });

    const productAttribute = new ProductAttribute();
    productAttribute.attribute = attribute;
    productAttribute.product = product;
    productAttribute.value = data.value;
    productAttribute.unit = data.unit;
    return await this.prodAttribRepository.save(productAttribute);
  }

  async update(id: UUID, changes: UpdateProductAttributeDto) {
    const prodAttrib = await this.findOne(id);

    const updProdAttrib = this.prodAttribRepository.merge(prodAttrib, changes);
    return await this.prodAttribRepository.save(updProdAttrib);
  }

  async remove(id: string) {
    await this.prodAttribRepository.delete(id);
    return id;
  }
}
