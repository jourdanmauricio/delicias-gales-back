import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProductAttributeDto {
  /**
   * El Id del producto
   * @example 'xxx-xxx-xxxxx-xxxx'
   */
  @IsUUID()
  @IsNotEmpty()
  readonly productId: string;

  /**
   * El Id del attributo
   * @example 'xxx-xxx-xxxxx-xxxx'
   */
  @IsUUID()
  @IsNotEmpty()
  readonly attributeId: string;

  /**
   * El valor del debe ser una cadena de texto no nula
   * @example '40'
   */
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  /**
   * Unidad de medido
   * @example 'gr'
   */
  @IsString()
  @IsNotEmpty()
  readonly unit: string;
}

export class UpdateProductAttributeDto extends PartialType(
  CreateProductAttributeDto,
) {}
