import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsNumber, IsString
} from 'class-validator';

export class CreatePostDto {
  @IsNumber({}, { message: '숫자만 입력할 수 있습니다.', })
  @ApiProperty({ type: Number, description: '유저 식별자', example: 1, })
  @Type(() => Number)
  userId: number;

  @IsString({ message: '문자열만 입력할 수 있습니다.', })
  @IsNotEmpty({ message: '제목을 입력해야합니다.', })
  @ApiProperty({ type: String, description: '제목', example: '제목 테스트', })
  title: string;

  @IsString({ message: '문자열만 입력할 수 있습니다.', })
  @IsNotEmpty({ message: '내용을 입력해야합니다.', })
  @ApiProperty({ type: String, description: '내용', example: '내용 테스트', })
  content: string;
}
