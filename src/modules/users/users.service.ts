import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAdminUserDto,
  CreateUserDto,
  UpdateUserDto,
  CreateUserwhitGoogleDto,
} from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/models/roles.enum';
// import { UserAuthGuard } from 'src/guards/userAuth.guard';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByRole(role: Role) {
    const user = await this.usersRepository.find({ where: { role } });
    return user;
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
  // agregre el siguiente  servisio debido a que el id debia tiparse como strig en este caso especifico
  async findOneGoogle(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }
  async createWhitGoogle(data: CreateUserwhitGoogleDto) {
    const newUser = this.usersRepository.create(data);
    console.log('enttro a crear el usuario');
    return await this.usersRepository.save(newUser);
  }

  async createAdmin(id: UUID, data: CreateAdminUserDto) {
    const password = process.env.ADMIN_PASSWORD;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      ...data,
      password: hashPass,
      sellerId: id,
    });
    return await this.usersRepository.save(newUser);
  }

  async update(id: UUID, changes: UpdateUserDto) {
    const user = await this.findOne(id);

    if (changes.password) {
      const hashedPass = await bcrypt.hash(changes.password, 10);
      changes = { ...changes, password: hashedPass };
      // if (!user.activationDate)
      //   changes = { ...changes, activationDate: new Date() };
    }

    const updUser = this.usersRepository.merge(user, changes);
    return await this.usersRepository.save(updUser);
  }

  // remove(id: UUID) {
  //   return `This action removes a #${id} user`;
  // }
}
