import { Controller, Get, Post, Body, Headers,Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtDecrypTool } from 'src/utils/InternalTools';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteCourseDto } from './dto/delete-course.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtDecrypTool: JwtDecrypTool
  ) {}

  @Get()
  findAll(@Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.findAll();
  }

  @Post()
  create(@Body() dto: CreateCourseDto, @Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.create(dto);
  }

  @Put()
  async update(@Headers() header, @Body() dto: UpdateCourseDto) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.update(dto);
  }

  @Delete()
  async delete(@Body() dto: DeleteCourseDto) {
    return this.courseService.delete(dto);
  }
}
