import { ApiProperty } from '@nestjs/swagger';

export class ResDto {
  @ApiProperty({ type: String, description: '응답 메시지', })
  message: string;
}
