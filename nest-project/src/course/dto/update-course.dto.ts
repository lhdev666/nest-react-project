import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCourseDto {
  @IsNotEmpty({ message: 'id限制不可为空' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'id限制必须为数字' },
  )
  id: number;

  @IsString({ message: 'title限制必须为字符串' })
  title?: string;

  @IsString({ message: 'course_img限制必须为字符串' })
  course_img?: string;

  @IsString({ message: 'price限制必须为字符串' })
  price?: string;

  @IsString({ message: 'point限制必须为字符串' })
  point?: string;

  @IsString({ message: 'category限制必须为字符串' })
  category?: string;
}