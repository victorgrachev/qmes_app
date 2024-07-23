import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/user.module';
import { UserController } from '@/web/user';
import { ChatController } from '@/web/chat';
import { ChatModule } from '@/chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'node:path';
import { StaticServerMiddleware } from '@/web/static-server.middleware';

@Module({
  imports: [
    UserModule,
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../..', 'qmes_app_frontend/dist'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [UserController, ChatController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StaticServerMiddleware).exclude('api/(.*)').forRoutes('*');
  }
}
