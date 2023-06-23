import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity]), /*AuthModule*/],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
