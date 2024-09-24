import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteCourseDto } from './dto/delete-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
  ) {}
  
  findAll() {
    return this.courseRepository.findBy({ del: '0' });
  }

  async create(dto: CreateCourseDto) {
    await this.courseRepository.save({
      ...dto,
      del: '0',
    });
  }

  async update(dto: UpdateCourseDto) {
    await this.courseRepository.update(dto.id, dto);
  }

  async delete(dto: DeleteCourseDto) {
    await this.courseRepository.update(dto.id, {
      del: '1',
    });
  }
}
