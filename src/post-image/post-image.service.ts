import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { readdirSync, renameSync } from 'fs';
import { PostImageEntity } from './entity/post-image.entity';
import { CreateImagesResDto } from './dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PostImageService {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaService) { }

  async getPostImageByPostId(postId: number): Promise<PostImageEntity[]> {
    return this.prisma.postImage.findMany({
      where: { postId, },
    });
  }

  async createPostIamge(
    images: Express.Multer.File[]
  ): Promise<CreateImagesResDto> {
    const extArray = [];
    const sizeArray = [];
    const path = join(process.cwd(), 'u', 'tempImages');
    const newPath = join(process.cwd(), 'u', 'postImages');

    [ ...images, ].forEach(async (item) => {
      extArray.push(extname(item.originalname));
      sizeArray.push(item.size);
    });

    const imageList = readdirSync(path);

    const createData = imageList.map((item, index) => {
      renameSync(`${path}\\${item}`, `${newPath}\\${item}`);

      return {
        postId: null,
        imagePath: `${newPath}\\${item}`,
        imageType: extArray[index],
        imageSize: sizeArray[index],
      };
    });

    await this.prisma.postImage.createMany({
      data: createData,
    });

    return {
      message: '이미지가 업로드되었습니다.',
      count: imageList.length,
    };
  }

  async deletePostImage(id: number): Promise<PostImageEntity> {
    return this.prisma.postImage.delete({
      where: { id, },
    });
  }
}
