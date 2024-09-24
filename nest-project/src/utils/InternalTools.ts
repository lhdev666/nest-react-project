import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

//md5加密工具
@Injectable()
export class SecretTool {
  getSecret(data: string) {
    return createHash('md5').update(data).digest('hex');
  }
}

@Injectable()
export class JwtDecrypTool {
  constructor(private readonly jwtService: JwtService) {}
  getDecryp(token: string) {
    let decodedToken: any;
    try {
      decodedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('token 有误!');
    }
    console.log(decodedToken);
    if (!decodedToken) throw new BadRequestException('请先登录!');
    if (decodedToken.exp - decodedToken.iat <= 0)
      throw new BadRequestException('登录已过期，请重新登陆!');
    return decodedToken.id;
  }
}