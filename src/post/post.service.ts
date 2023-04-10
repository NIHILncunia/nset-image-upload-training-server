import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostEntity } from './entity/post.entity';
import { UserEntity } from '@/user/entity/user.entity';

@Injectable()
export class PostService {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaService) { }

  async getPosts() {
    return this.prisma.post.findMany();
  }

  async getPostById(id: number): Promise<UserEntity> {
    return this.prisma.post.findUnique({
      where: { id, },
    });
  }

  async getPostByUserId(userId: number): Promise<UserEntity[]> {
    return this.prisma.post.findMany({
      where: { userId, },
    });
  }

  async createPost(
    createPostDto: CreatePostDto
  ): Promise<PostEntity> {
    const post = await this.prisma.post.create({
      data: createPostDto,
    });

    await this.prisma.postImage.updateMany({
      where: { postId: null, },
      data: {
        postId: post.id,
      },
    });

    return this.prisma.post.findUnique({
      where: { id: post.id, },
      include: { PostImage: true, },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    console.log('updatePostDto >> ', updatePostDto);
    return this.prisma.post.update({
      where: { id, },
      data: updatePostDto,
    });
  }

  async deletePost(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: { id, },
    });
  }
}
