import {
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  // Param,
  ParseFilePipe,
  //ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesService } from './files.service';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/models/roles.enum';
// import { RolesGuard } from 'src/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
//import { UUID } from 'crypto';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @Roles(Role.ADMIN_COWORKING)
  // @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image', { limits: { files: 1 } }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 300000,
            message: `El archivo debe ser menor a 300kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Upload Image
    console.log('upload image');
    const image = await this.filesService.uploadImage(file);
    if (!image)
      throw new InternalServerErrorException('Error cargando la imagen');

    return image;
  }

  // @Put('upload-image-coworking/:id')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })

  // @Roles(Role.ADMIN_COWORKING)
  // @UseGuards(RolesGuard, UserAuthCoworkingGuard)
  // @UseInterceptors(FileInterceptor('image', { limits: { files: 1 } }))
  // async uploadImageCoworking(
  //   @Param('id', ParseUUIDPipe) id: UUID,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({
  //           maxSize: 300000,
  //           message: `El archivo debe ser menor a 300kb`,
  //         }),
  //         new FileTypeValidator({
  //           fileType: /(jpg|jpeg|png|webp)$/,
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   // Upload Image
  //   const image = await this.filesService.uploadImage(file);
  //   if (!image)
  //     throw new InternalServerErrorException('Error cargando la imagen');

  //   // Update Coworking
  //   return await this.coworkingsService.addImage(id, image.secure_url);
  // }
}
