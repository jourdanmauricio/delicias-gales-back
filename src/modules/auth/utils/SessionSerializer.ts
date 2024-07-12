/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: User, done: Function) {
    const user = await this.userService.findOneGoogle(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
