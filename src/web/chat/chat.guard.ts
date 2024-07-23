import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '@/user/user.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private userService: UserService) {}

  private getUserIdFromCookie(request: Request) {
    return Number(request.cookies.userId);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = this.getUserIdFromCookie(request);

    if (!userId) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.userService.getUserById(userId);

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
