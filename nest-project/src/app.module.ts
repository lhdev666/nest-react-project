import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { typeOrmConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UserModule, CourseModule,TypeOrmModule.forRoot(typeOrmConfig)]
})
export class AppModule {}
