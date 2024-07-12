import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const password = '54151541541';
    try {
      const user = await this.authService.validateUser({
        email: profile._json.email,
        displayName: profile._json.name,
        image: profile._json.picture,
        password,
      });
      console.log('usuario distinguido', user);

      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        roles: user.role,
      };
      const token = this.jwtService.sign(userPayload);
      console.log(user, token);

      return { user, token };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
