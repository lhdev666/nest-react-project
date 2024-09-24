import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'username限制不为空!' })
  @IsString({ message: 'username限制为字符串类型!' })
  username: string;

  @IsNotEmpty({ message: 'password限制不为空!' })
  @IsString({ message: 'password限制为字符串类型!' })
  password: string;
}