import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@/user/entity/user.entity';
import { PostImageEntity } from '@/post-image/entity/post-image.entity';

export class PostEntity {
  @ApiProperty({ type: Number, description: '식별자', required: false, })
  id?: number;

  @ApiProperty({ type: Number, description: '유저 식별자', })
  userId?: number;

  @ApiProperty({ type: String, description: '제목', })
  title?: string;

  @ApiProperty({ type: String, description: '내용', })
  content?: string;

  @ApiProperty({ type: Date, description: '작성일자', required: false, })
  created?: Date;

  @ApiProperty({ type: Date, description: '수정일자', required: false, })
  updated?: Date;

  @ApiProperty({ type: () => UserEntity, description: '유저', required: false, })
  user?: UserEntity;

  @ApiProperty({
    type: () => PostImageEntity,
    isArray: true,
    description: '포스트 이미지',
    required: false,
  })
  PostImage?: PostImageEntity[];
}
