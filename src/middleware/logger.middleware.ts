import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = moment().format('YYYY/MM/DD-h:mm:ssa');
  console.log(
    `[Global Middleware Logger] HTTP Request: ${req.method} ${req.url}, ${date}`,
  );
  next();
}
