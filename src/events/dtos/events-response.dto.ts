import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

/**
 * DTO for returning event details.
 */
export class EventResponseDto {
  @ApiProperty()
  @Expose()
  @Transform(({ obj }: { obj: { _id: string } }) => obj._id, {
    toClassOnly: true,
  })
  event_id: string;

  @ApiProperty()
  @Expose()
  event_name: string;

   @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  executeAt: Date;

   @ApiProperty()
  @Expose()
  executedAt: Date;

}
