import { Controller, Post, Body,Get,Headers} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { get } from 'http';
import { JwtDecrypTool } from 'src/utils/InternalTools';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtDecrypTool: JwtDecrypTool
  ) {}

  @Post('register')
  register(@Body() dto:RegisterUserDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  login(@Body() dto) {
    return this.userService.login(dto);
  }

  @Get('find')
  find(@Headers() header) {
    return this.userService.find(this.jwtDecrypTool.getDecryp(header.authorization))
  }

}
