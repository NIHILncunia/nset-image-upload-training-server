import { ApiProperty } from '@nestjs/swagger';

export class ResArrayDto {
  @ApiProperty({
    description: '응답 메시지 배열',
    type: 'string',
    isArray: true,
  })
  message: string[];
}
