import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtDecrypTool, SecretTool } from '../utils/InternalTools';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register(jwtConfig)],
  controllers: [UserController],
  providers: [UserService,SecretTool,JwtDecrypTool],
})
export class UserModule {}
