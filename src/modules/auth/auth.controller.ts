import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto, LoginUserDto, RecoveryPassDto } from './auth.dto';
import { GoogleOauthGuard } from 'src/guards/googleOauth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // pendiente de terminar el redirect

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  googleLogin() {
    return { msg: 'google login' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  handleGoogleRedirect(@Req() request: Request, @Res() res: Response) {
    res.redirect('localhost:3001/');
  }
  // ---------------------------------
  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    return this.authService.signin(credentials);
  }

  @Post('signup')
  signup(@Body() date: CreateUserDto) {
    return this.authService.signup(date);
  }

  @Put('forgot-password')
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Put('recovery-password')
  recoveryPass(@Body() data: RecoveryPassDto) {
    return this.authService.recoveryPass(data);
  }
}
