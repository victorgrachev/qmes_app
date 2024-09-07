import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { User } from '@/user/user.entity';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((user: User) => {
        const http = context.switchToHttp();

        const res = http.getResponse();
        const req = http.getRequest();

        res.cookie('current-user-id', user.id, {
          path: `/api/chat/${req.body.chatExternalId}`,
        });
      }),
    );
  }
}
