import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/users.dto';
import { LoginUserDto, RecoveryPassDto } from './auth.dto';
import { UUID } from 'crypto';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async signin(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credenttials');

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new UnauthorizedException('Invalid credenttials');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(userPayload);
    return { user, token };
  }

  async signup(user: CreateUserDto) {
    const dbUser = await this.usersService.findByEmail(user.email);
    if (dbUser) throw new BadRequestException('El email se encuentra en uso');

    const hashedPass = await bcrypt.hash(user.password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    return this.usersService.create({ ...user, password: hashedPass });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Verifique su dirección de email');

    const payload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    await this.usersService.update(user.id as UUID, {
      recoveryToken: token,
    });

    const link = `${process.env.NODEMAILER_FRONT_URL}/recovery-password?token=${token}`;

    this.nodemailerService.forgotPassEmail(email, user.name, link);
  }

  async recoveryPass(data: RecoveryPassDto) {
    const { token, password } = data;

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      const user = await this.usersService.findOne(payload.id);

      if (user.recoveryToken !== token)
        throw new BadRequestException('Token inválido');

      const updUser = await this.usersService.update(payload.id, {
        password,
        recoveryToken: null,
      });

      return updUser;
    } catch (error) {
      throw new BadRequestException('Token inválido');
    }
  }
}
