import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';
import { ProductStatus } from 'src/models/productStatus.enum';

export class CreateProductDto {
  /**
   * El nombre del producto debe ser una cadena de texto, máximo 50 caracteres
   * @example 'Chorizo de Cantimpalo'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  /**
   * El código del producto debe ser una cadena de texto, máximo 20 caracteres
   * @example 'CHO001'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly cod: string;

  /**
   * El SKU del producto debe ser una cadena de texto, máximo 20 caracteres
   * @example 'CHO001'
   */
  @IsString()
  @IsOptional()
  @MaxLength(20)
  readonly sku: string;

  /**
   * El estado-.--
   * @example active
   */
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  readonly status: ProductStatus;

  /**
   * El precio debe ser un número positivo
   * @example 100
   */
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly originalPrice: number;

  /**
   * El precio debe ser un número positivo
   * @example 100
   */
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly wholesalePrice: number;

  /**
   * El precio debe ser un número positivo
   * @example 100
   */
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly retailPrice: number;

  /**
   * El stock debe ser un número
   * @example 10
   */
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;

  /**
   * El cantidad mínima debe ser un número positivo
   * @example 10
   */
  @IsNotEmpty()
  @IsNumber()
  readonly minQuantity: number;

  /**
   * El cantidad máxima debe ser un número positivo
   * @example 10
   */
  @IsOptional()
  @IsNumber()
  readonly maxQuantity: number;

  /**
   * La imagen debe ser una url y es opcional
   * @example https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp
   */
  @IsUrl()
  @IsOptional()
  readonly thumbnail?: string;

  /**
   * La descripción del producto debe ser una cadena de texto no nula
   * @example 'Originario de la región de Segovia, España. Es conocido por su sabor suave y textura fina.'
   */
  @IsString()
  @IsOptional()
  readonly description: string;

  /**
   * Id de la categoría del producto, es obligatoria
   * @example ['bf9a36ba-363e-4a24-9a11-84a96b3a901e']
   */
  @IsArray()
  @IsNotEmpty()
  readonly categoriesIds: UUID[];

  @IsNotEmpty()
  @IsUUID()
  readonly brandId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
