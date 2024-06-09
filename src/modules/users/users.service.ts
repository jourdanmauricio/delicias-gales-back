import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOne(id: UUID) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  update(id: UUID, changes: UpdateUserDto) {
    return `This action updates a #${id}, ${changes} user`;
  }

  // remove(id: UUID) {
  //   return `This action removes a #${id} user`;
  // }
}
