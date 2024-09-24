import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SecretTool } from 'src/utils/InternalTools';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly secretTool: SecretTool,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async register({ username, password }: RegisterUserDto) {

    // 查找用户是否注册过
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });

    if (foundUser) {
      throw new BadRequestException('用户已存在！');
    }

    // 插入一条新用户数据
    const user = await this.userRepository.save({
      username,
      password: this.secretTool.getSecret(password),
      head_img: 'https://sdfsdf.dev/35x35.png',
    });

    return {
      msg: '注册成功！',
      data: this.jwtService.sign({ id: user.id }),
    };
  }

  async login({ username, password }) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new BadRequestException('账号或密码错误');
    }
  
    const isPasswordValid =
      user.password === this.secretTool.getSecret(password);
  
    if (!isPasswordValid) {
      throw new BadRequestException('账号或密码错误');
    }
  
    return { data: this.jwtService.sign({ id: user.id }), msg: '登录成功！' };
  }

  async find(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return { id: user.id, username: user.username, head_img: user.head_img };
  }
}
