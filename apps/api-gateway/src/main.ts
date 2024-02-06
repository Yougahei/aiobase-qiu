import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from '@app/common/interceptors/transform.interceptor';
import { AllExceptionsFilter, HttpExceptionFilter } from '@app/common';
import { generateDocument } from './doc';
import { FastifyLogger } from '@app/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // 使用 FastifyAdapter 作为 NestFactory 的第二个参数，并且传入 FastifyLogger
    new FastifyAdapter({
      logger: FastifyLogger,
    }),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常处理
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 创建API文档
  generateDocument(app);

  await app.listen(3000);
}
bootstrap();
