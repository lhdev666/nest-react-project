import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { JwtDecrypTool } from '../utils/InternalTools';

@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, JwtDecrypTool],
})
export class CourseModule {}