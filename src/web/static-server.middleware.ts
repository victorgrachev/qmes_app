import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'node:path';

@Injectable()
export class StaticServerMiddleware implements NestMiddleware {
  use(_: Request, res: Response) {
    console.log(__dirname);

    console.log(__dirname);

    res.sendFile('qmes_app_frontend/dist/index.html', {
      root: path.join(__dirname, '../..', 'qmes_app_frontend/dist'),
    });
  }
}
