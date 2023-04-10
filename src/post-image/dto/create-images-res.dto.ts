import { ApiProperty } from '@nestjs/swagger';

export class CreateImagesResDto {
  @ApiProperty({ type: String, description: '메시지', })
  message: string;

  @ApiProperty({ type: Number, description: '생성 개수', })
  count: number;
}
