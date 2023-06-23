import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config/dist';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleWare } from './logger/logger.middleware';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`./src/config/env/.development.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
      migrations: [__dirname + '/**/migrations/*.ts'],
      migrationsTableName: 'migrations',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleWare).forRoutes('/users');
  }
}
