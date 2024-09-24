import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCourseDto {
  @IsNotEmpty({ message: 'id限制不可为空' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'id限制必须为数字' },
  )
  id: number;
}