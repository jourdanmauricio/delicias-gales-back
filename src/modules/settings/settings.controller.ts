import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto, UpdateSettingDto } from './setting.dto';
import { UUID } from 'crypto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() data: CreateSettingDto) {
    return this.settingsService.create(data);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.settingsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateSettingDto,
  ) {
    return this.settingsService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.settingsService.remove(id);
  }
}
