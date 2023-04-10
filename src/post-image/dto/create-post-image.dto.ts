import { ApiProperty } from '@nestjs/swagger';

export class CreatePostImageDto {
  @ApiProperty({ type: Number, description: '포스트 식별자', })
  postId: number;

  @ApiProperty({ type: String, description: '이미지 경로', })
  imagePath: string;

  @ApiProperty({ type: String, description: '이미지 타입', })
  imageType: string;

  @ApiProperty({ type: Number, description: '이미지 용량', })
  imageSize: number;
}
