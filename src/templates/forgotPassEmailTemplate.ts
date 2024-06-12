function forgotPassEmail(name: string, link: string) {
  const html = `
<td align="left" style="padding: 20px;">
    <p style="font-size: 16px; margin: 0;">Hola ${name}, recibimos una solicitud para restablecer tu contraseña.</p> 
    <br>
    <p style="font-size: 16px; margin: 0;"><strong>Si no fuiste tú ignora este email.</strong></p> 
    <br>
    <p style="font-size: 16px; margin: 0;">Haz clic en el botón de abajo para restablecer la contraseña.</p>
    <div style="text-align: center;">
      <a href="${link}" style="text-align: center; display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #f8b400; text-decoration: none; border-radius: 5px; margin: 32px auto;">Recuperar Contraseña</a>
    </div>
    <p style="font-size: 16px; margin: 0;">También puede copiar y pegar en el navegador el siguiente enlace:</p>
    <br>
    <p style="style="font-size: 16px; margin: 0; display: inline-block; max-width: 100%; word-wrap: break-word; overflow-wrap: break-word; white-space: pre-wrap;">
      <span style="word-break: break-all;">${link}</span>
    </p>
</td>
`;

  const header = `
    <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email de Recuperación de Contraseña</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6; max-width:600px; margin: auto;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f6f6f6;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border: 1px solid #dddddd;">
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #f8b400; color: #ffffff;">
                            <h1 style="margin: 0;">Delicias Gales</h1>
                        </td>
                    </tr>
                    <tr>
  `;

  const footer = `
                    </tr>
                    <tr>
                      <td align="left" style="padding: 20px;">
                      <p style="font-size: 16px; margin: 0;">Muchas gracias.</p>
                      <p style="font-size: 16px; margin: 0;">Saludos.</p>
                      <p style="font-size: 16px; margin: 0;"><i><a href='#'>Delicias Gales</a></i></p>
                      </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #f1f1f1;">
                            <p style="font-size: 16px; margin: 0;">Síguenos en nuestras redes sociales:</p>
                            <div style="margin-top: 10px;">
                                <a href="https://facebook.com/deliciasgales" style="margin: 0 10px; text-decoration: none; color: #333333;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style="width: 30px; height: 30px; vertical-align: middle;">
                                </a>
                                <a href="https://twitter.com/deliciasgales" style="margin: 0 10px; text-decoration: none; color: #333333;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt="Twitter" style="width: 30px; height: 30px; vertical-align: middle;">
                                </a>
                                <a href="https://instagram.com/deliciasgales" style="margin: 0 10px; text-decoration: none; color: #333333;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="width: 30px; height: 30px; vertical-align: middle;">
                                </a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
  </body>
</html>
`;

  return header + html + footer;
}
export default forgotPassEmail;
