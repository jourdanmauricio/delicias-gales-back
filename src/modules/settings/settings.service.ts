import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto, UpdateSettingDto } from './setting.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from 'src/entities/settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async findAll() {
    const settings = await this.settingsRepository.find();
    return settings;
  }

  async findOne(id: UUID) {
    const setting = await this.settingsRepository.findOneBy({ id });
    if (!setting) throw new NotFoundException('Característica no encontrada');
    return setting;
  }

  async create(data: CreateSettingDto) {
    const newSetting = this.settingsRepository.create(data);
    return await this.settingsRepository.save(newSetting);
  }

  async update(id: UUID, changes: UpdateSettingDto) {
    const setting = await this.findOne(id);

    const updSetting = this.settingsRepository.merge(setting, changes);
    return await this.settingsRepository.save(updSetting);
  }

  remove(id: UUID) {
    return `This action removes a #${id} setting`;
  }
}
