import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'title限制不可为空' })
  @IsString({ message: 'title限制必须为字符串' })
  title: string;

  @IsNotEmpty({ message: 'course_img限制不可为空' })
  @IsString({ message: 'course_img限制必须为字符串' })
  course_img: string;

  @IsNotEmpty({ message: 'price限制不可为空' })
  @IsString({ message: 'price限制必须为字符串' })
  price: string;

  @IsNotEmpty({ message: 'point限制不可为空' })
  @IsString({ message: 'point限制必须为字符串' })
  point: string;

  @IsNotEmpty({ message: 'category限制不可为空' })
  @IsString({ message: 'category限制必须为字符串' })
  category: string;
}