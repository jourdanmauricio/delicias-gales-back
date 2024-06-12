import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { transporter } from '../../config/nodemailer';
import { config as dotenvConfig } from 'dotenv';
import forgotPassEmail from 'src/templates/forgotPassEmailTemplate';

dotenvConfig({
  path: '.env',
});

@Injectable()
export class NodemailerService {
  async forgotPassEmail(email: string, name: string, link: string) {
    if (!name) {
      throw new BadRequestException('Nombre es obligatorio');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Solicitud cambio de contraseña',
      html: forgotPassEmail(name, link),
    };

    try {
      const info = await transporter.sendMail(emailConfig);
      console.log('Correo electrónico enviado:', info.response);
      return 'Correo electrónico enviado';
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new InternalServerErrorException(
        `Error al enviar el correo electrónico:${error}`,
      );
    }
  }
}
