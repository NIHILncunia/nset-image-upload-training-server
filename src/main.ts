import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 4000;
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.set('etag', false);

  const config = new DocumentBuilder()
    .setTitle('니힐보드')
    .setDescription('누구나 간편하게 게시글을 작성할 수 있습니다.')
    .setVersion('1.0') // API 버전
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: '니힐보드 API 설명서',
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
    },
  });

  const logger = new Logger('NestApplication', { timestamp: true, });

  await app.listen(
    port,
    () => {
      logger.log(`서버가 ${port} 포트에서 실행됩니다.`);
      logger.log(`http://localhost:${port}/docs`);
    }
  );
}
bootstrap();
