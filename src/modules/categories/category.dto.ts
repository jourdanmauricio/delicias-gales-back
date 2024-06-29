import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  /**
   * El nombre debe ser una cadena de texto no nula
   * @example Jabones
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * La imagen debe ser una url y es opcional
   * @example https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp
   */
  @IsUrl()
  @IsOptional()
  readonly image?: string;

  /**
   * El campo Show debe ser true o false. Por default es true. Determina si se debe mostrar la categoría
   * @example false
   */
  @IsBoolean()
  @IsOptional()
  readonly show?: boolean;

  /**
   * La descripción de la categoría debe ser una cadena de texto no nula
   * @example 'Originario de la región de Segovia, España. Es conocido por su sabor suave y textura fina.'
   */
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
