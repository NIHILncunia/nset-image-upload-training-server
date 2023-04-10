import { Logger, Module } from '@nestjs/common';
import { extname, join } from 'path';
import { mkdirSync, readdirSync } from 'fs';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';

const mkdir = (directory: string) => {
  const logger = new Logger('PostsModule');

  try {
    readdirSync(join(process.cwd(), 'u', directory));
  } catch (error) {
    logger.log(
      `지정한 경로에 '${directory}'폴더가 존재하지 않아 '${directory}'폴더를 생성합니다.`
    );

    mkdirSync(join(process.cwd(), 'u', directory));
  }
};

mkdir('tempImages');

@Module({
  imports: [ MulterModule.register({
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, join(process.cwd(), 'u', 'tempImages'));
      },
      filename: (req, file, cb) => {
        file.originalname = Buffer
          .from(file.originalname, 'latin1')
          .toString('utf-8');

        const fileExt = extname(file.originalname);
        cb(null, `${new Date().getTime()}-${uuid()}${fileExt}`);
      },
    }),
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  }), ],
  controllers: [ PostImageController, ],
  providers: [ PostImageService, ],
})
export class PostImageModule {}
