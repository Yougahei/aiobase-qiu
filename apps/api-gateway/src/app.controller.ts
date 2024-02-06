import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { BusinessException } from '@app/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

// 在 Controller 上添加版本号装饰器
@Controller({ path: 'app', version: '1' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats')
  // 启用版本配置之后再在 Controller 中请求方法添加对应的版本号装饰器
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.appService.findAll();
  }

  @Get('cats')
  @Version('2')
  findAllV2() {
    return this.appService.findAllV2();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.appService.findAll();
  }

  @Get('getTestName')
  getTestName() {
    console.log(this.configService.get('TEST_VALUE'));
    return this.configService.get('TEST_VALUE').name;
  }
}
