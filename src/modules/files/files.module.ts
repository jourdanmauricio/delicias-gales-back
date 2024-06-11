import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig],
})
export class FilesModule {}
