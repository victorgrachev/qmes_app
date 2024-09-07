import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GetUserByIdInteractor } from '@/user/get-user-by-id.interactor';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private getUserByIdInteractor: GetUserByIdInteractor) {}

  private getUserIdFromCookie(request: Request) {
    return Number(request.cookies['current-user-id']);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const userId = this.getUserIdFromCookie(req);

    if (!userId) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.getUserByIdInteractor.execute(userId);

      req['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
