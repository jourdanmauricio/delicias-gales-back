import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * La imagen debe ser una url y es opcional
   * @example https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp
   */
  @IsUrl()
  @IsNotEmpty()
  readonly image?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
