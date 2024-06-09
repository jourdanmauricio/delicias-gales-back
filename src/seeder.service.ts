import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Role } from './models/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed() {
    console.log('PRELOAD DATA');

    const users = await this.usersRepository.find();
    if (users.length > 0) {
      console.log('Preload ready');
      return;
    }

    await this.preloadSuperAdminUser();
  }

  async preloadSuperAdminUser() {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = {
      name: process.env.ADMIN_NAME,
      lastname: process.env.ADMIN_LASTNAME,
      phone: process.env.ADMIN_PHONE,
      email: process.env.ADMIN_EMAIL,
      identification: process.env.ADMIN_IDENTIFICATION,
      password: hashedPassword,
      role: Role.ADMIN,
    };
    return await this.usersRepository.save(adminUser);
  }
}
