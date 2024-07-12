import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { GoogleStrategy } from './utils/GoogleStategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [NodemailerModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
