import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dirname, join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // use to enable .env value globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true
      })
    }),
    UsersModule,
    AuthModule,
  ],
  // controllers: [AppController, AuthController],
  // providers: [AppService, AuthService],


})
export class AppModule { }
