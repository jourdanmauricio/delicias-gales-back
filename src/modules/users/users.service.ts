import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
// import { UserAuthGuard } from 'src/guards/userAuth.guard';

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

  async update(id: UUID, changes: UpdateUserDto) {
    const user = await this.findOne(id);

    // if (changes.password) {
    //   const hashedPass = await bcrypt.hash(changes.password, 10);
    //   changes = { ...changes, password: hashedPass };
    //   if (!user.activationDate)
    //     changes = { ...changes, activationDate: new Date() };
    // }

    const updUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updUser);
  }

  // remove(id: UUID) {
  //   return `This action removes a #${id} user`;
  // }
}
