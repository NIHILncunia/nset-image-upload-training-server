import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import {
  ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { PostService } from './post.service';
import { PostEntity } from './entity/post.entity';
import { HttpErrorDTO, ResArrayDto } from '@/common/dto';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Auth } from '@/auth/decorator';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly postService: PostService) { }

  @Get()
  @ApiOperation({
    summary: '전체 포스트 조회',
    description: '전체 포스트를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    isArray: true,
    description: '성공',
  })
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get('/:id')
  @ApiOperation({
    summary: '개별 포스트 조회',
    description: '개별 포스트를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: '포스트의 식별자입니다.',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    description: '성공',
  })
  async getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({
    summary: '사용자별 포스트 조회',
    description: '사용자별 포스트를 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '포스트를 작성한 유저의 식별자입니다',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    isArray: true,
    description: '성공',
  })
  async getPostByUserId(@Param('userId') userId: number) {
    return this.postService.getPostByUserId(userId);
  }

  @Post()
  @Auth([ UserRole.USER, ])
  @ApiOperation({
    summary: '포스트 작성',
    description: '새로운 포스트를 작성합니다.',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    type: ResArrayDto,
    description: '에러',
  })
  @ApiResponse({
    status: 401,
    type: HttpErrorDTO,
    description: '인증 실패',
  })
  async createPost(
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postService.createPost(createPostDto);
  }

  @Patch('/:id')
  @Auth([ UserRole.USER, UserRole.ADMIN, ])
  @ApiOperation({
    summary: '포스트 수정',
    description: '포스트를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: '포스트의 식별자입니다.',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    type: HttpErrorDTO,
  })
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete('/:id')
  @Auth([ UserRole.USER, UserRole.ADMIN, ])
  @ApiOperation({
    summary: '포스트 삭제',
    description: '포스트를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: '포스트의 식별자입니다.',
  })
  @ApiResponse({
    status: 200,
    type: () => PostEntity,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    type: HttpErrorDTO,
  })
  async deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
