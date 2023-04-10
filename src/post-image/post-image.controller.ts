import {
  Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { PostImageService } from './post-image.service';
import { PostImageEntity } from './entity/post-image.entity';
import { Auth } from '@/auth/decorator';
import { CreateImagesResDto } from './dto';
import { HttpErrorDTO } from '@/common/dto';

@Controller('post-images')
@ApiTags('PostImages')
export class PostImageController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly postImageService: PostImageService) { }

  @Get('/post/:postId')
  @ApiOperation({
    summary: '포스트별 이미지 조회',
    description: '포스트별 이미지를 조회합니다.',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: '포스트 식별자를 입력합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: () => PostImageEntity,
    isArray: true,
  })
  async getPostImageByPostId(@Param('postId') postId: number) {
    return this.postImageService.getPostImageByPostId(postId);
  }

  @Post()
  @Auth([ UserRole.USER, ])
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지를 업로드합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CreateImagesResDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    type: HttpErrorDTO,
  })
  async createPostImage(
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    return this.postImageService.createPostIamge(images);
  }

  @Delete('/:id')
  @Auth([ UserRole.USER, ])
  @ApiOperation({
    summary: '이미지 삭제',
    description: '이미지를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '식별자를 입력합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: () => PostImageEntity,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    type: HttpErrorDTO,
  })
  async deletePostImage(@Param('id') id: number) {
    return this.postImageService.deletePostImage(id);
  }
}
