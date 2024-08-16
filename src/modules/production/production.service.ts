import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Production } from 'src/entities/production.entity';
import { ProductionItem } from 'src/entities/productionItem.entity';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './production.dto';
import { Product } from 'src/entities/product.entity';
import { ProductInventories } from 'src/entities/productInventory';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private productionRepo: Repository<Production>,
    @InjectRepository(ProductionItem)
    private productionItemRepo: Repository<ProductionItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductInventories)
    private inventoriesRepo: Repository<ProductInventories>,
  ) {}

  async findAll() {
    return await this.productionRepo.find();
  }
  async findOne(id: UUID) {
    const prodiction = await this.productionRepo.findOne({
      where: { id },
      relations: ['productionItems'],
    });

    return prodiction;
  }
  async create(data: CreateProductionDto) {
    const queryRunner =
      this.productionRepo.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { productId, productionItems = [], quantityProduced } = data;

      const product = await this.productRepo.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
      }
      if (quantityProduced <= 0) {
        throw new BadRequestException(
          `The quantityProduced must be greater than 0.`,
        );
      }

      const productionToAdd = this.productionRepo.create({
        product,
        quantityProduced,
      });

      await queryRunner.manager.save(productionToAdd);

      if (productionItems.length > 0) {
        const items = [];
        for (const item of productionItems) {
          const productItem = await this.productRepo.findOne({
            where: { id: item.productId },
          });

          if (!productItem) {
            throw new NotFoundException(
              `Product item with ID ${item.productId} not found.`,
            );
          }
          if (!(item.quantity > 0)) {
            throw new BadRequestException(
              `The quantity must be greater than 0.`,
            );
          }

          const productionItem = this.productionItemRepo.create({
            product: productItem,
            quantityUsed: item.quantity,
            production: productionToAdd,
          });

          items.push(productionItem);

          // Actualizar el stock del producto
          productItem.stock = productItem.stock - item.quantity;
          const restInventorie = this.inventoriesRepo.create({
            product: productItem,
            quantity: -item.quantity,
          });

          // Guardar inventarios actualizados
          await queryRunner.manager.save(restInventorie);
          await queryRunner.manager.save(productItem);
        }

        // Guardar todos los ProductionItems
        await queryRunner.manager.save(items);
      }

      // Crear y guardar el nuevo inventario para el producto principal
      const newProductInventory = this.inventoriesRepo.create({
        product,
        quantity: productionToAdd.quantityProduced,
      });
      product.stock = product.stock + productionToAdd.quantityProduced;

      await queryRunner.manager.save(newProductInventory);
      await queryRunner.manager.save(product);

      // Confirmar la transacción si todo salió bien
      await queryRunner.commitTransaction();
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Error creating production: ' + error.message,
      );
    } finally {
      // Asegurarse de liberar el queryRunner
      await queryRunner.release();
    }
  }
}

// productItem.stock = productItem.stock - item.quantity;
// const restInventorie = this.inventoriesRepo.create({
//   product: productItem,
//   quantity: -item.quantity,
// });
// await queryRunner.manager.save(restInventorie);
// await queryRunner.manager.save(productItem);

// async create(data: CreateProductionDto) {
//     const queryRunner =
//       this.productionRepo.manager.connection.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const { productId, productionItems, quantityProduced } = data;

//       const product = await this.productRepo.findOne({
//         where: { id: productId },
//       });
//       if (!product) {
//         throw new NotFoundException(
//           `productID  ${productId} not found (el producto que se quiere crear no se necontro)`,
//         );
//       }
//       if (quantityProduced <= 0) {
//         throw new BadRequestException(
//           `the quantityProduced must be grater than 0`,
//         );
//       }
//       const productiontoadd = this.productionRepo.create({
//         product,
//         quantityProduced,
//       });

//       await queryRunner.manager.save(productiontoadd);

//       if (productionItems.length > 0) {
//         const items = await Promise.all(
//           productionItems.map(async (item) => {
//             const productItem = await this.productRepo.findOne({
//               where: { id: item.productId },
//             });

//             if (!productItem) {
//               throw new NotFoundException(
//                 `the productId (itemproduction) ${item.productId} not found`,
//               );
//             }
//             if (!(item.quantity > 0)) {
//               throw new BadRequestException(
//                 `the quantity must be grater than 0`,
//               );
//             }
//             return this.productionItemRepo.create({
//               product: productItem,
//               quantityUsed: item.quantity,
//               production: productiontoadd,
//             });
//           }),
//         );
//         await queryRunner.manager.save(items);
//       }

//       const newProductInventory = this.inventoriesRepo.create({
//         product,
//         quantity: productiontoadd.quantityProduced,
//       });
//       product.stock = product.stock + productiontoadd.quantityProduced;

//       await queryRunner.manager.save(newProductInventory);
//       await queryRunner.manager.save(product);
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw new InternalServerErrorException(
//         'Error creating formulation: ' + error.message,
//       );
//     } finally {
//       await queryRunner.release();
//     }
//   }
