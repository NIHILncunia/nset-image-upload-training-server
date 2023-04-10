import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '@/post/entity/post.entity';

export class PostImageEntity {
  @ApiProperty({ type: Number, description: '식별자', required: false, })
  id?: number;

  @ApiProperty({ type: String, description: '포스트 식별자', })
  postId?: number;

  @ApiProperty({ type: String, description: '이미지 경로', })
  imagePath?: string;

  @ApiProperty({ type: Number, description: '이미지 타입', })
  imageType?: string;

  @ApiProperty({ type: Number, description: '이미지 용량', })
  imageSize?: number;

  @ApiProperty({ type: () => PostEntity, description: '이미지 용량', })
  post?: PostEntity;
}
