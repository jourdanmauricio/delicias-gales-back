import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  // Param,
  ParseFilePipe,
  //ParseUUIDPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesService } from './files.service';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/models/roles.enum';
// import { RolesGuard } from 'src/guards/roles.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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

  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 5 }], {
      limits: { fileSize: 300000 },
    }),
  )
  // @UseInterceptors(
  //   FileFieldsInterceptor('files', { limits: { fileSize: 300000 } }),
  // )
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({
          //   maxSize: 300000,
          //   message: `El archivo debe ser menor a 300kb`,
          // }),
          // new FileTypeValidator({
          //   fileType: /(jpg|jpeg|png|webp)$/,
          // }),
        ],
      }),
    )
    files: {
      files: Express.Multer.File[];
    },
  ) {
    const maxFileSize = 300000;
    const allowedFileTypes = /(jpg|jpeg|png|webp)$/;

    for (const file of files.files) {
      // Validar tamaño de archivo
      if (file.size > maxFileSize) {
        throw new BadRequestException(
          `El archivo ${file.originalname} debe ser menor a 300kb`,
        );
      }

      // Validar tipo de archivo
      if (!allowedFileTypes.test(file.mimetype)) {
        throw new BadRequestException(
          `El archivo ${file.originalname} debe ser de tipo jpg, jpeg, png o webp`,
        );
      }
    }

    // Upload Images
    const uploadedImages = [];
    for (const file of files.files) {
      const image = await this.filesService.uploadImage(file);
      if (!image)
        throw new InternalServerErrorException('Error cargando la imagen');
      uploadedImages.push(image);
    }

    return uploadedImages;
  }
}
