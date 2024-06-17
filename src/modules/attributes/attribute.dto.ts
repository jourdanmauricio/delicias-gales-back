import { PartialType } from '@nestjs/swagger';

export class CreateAttributeDto {}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}
