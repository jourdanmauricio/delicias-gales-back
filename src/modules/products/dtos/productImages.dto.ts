import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductImagesDto {
  /**
   * El Id del product
   * @example 'xxx-xxx-xxxxx-xxxx'
   */
  @IsUUID()
  @IsNotEmpty()
  readonly productId: UUID;

  /**
   * El valor del debe ser una cadena de texto no nula
   * @example '40'
   */
  @IsString()
  @IsNotEmpty()
  readonly secureUrl: string;
}

export class UpdateProductAttributeDto extends PartialType(
  CreateProductImagesDto,
) {}
