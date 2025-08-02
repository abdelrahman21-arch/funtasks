import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsFutureDate } from 'src/shared/configs/validators/is-future-date.validator';

/**
 * DTO for creating a new event.
 */
export class CreateEventDto {
  /**
   * The name of the event.
   * @example "Doctor Appointment"
   */
  @ApiProperty({ example: 'Doctor Appointment' })
  @IsString()
  @IsNotEmpty()
  event_name: string;

  /**
   * The date and time when the event is scheduled in UTC time.
   * Must be a valid ISO 8601 date string.
   * @example "2025-08-15T14:30:00Z"
   */
  @ApiProperty({ example: '2025-08-15T14:30:00Z' })
  @IsFutureDate({ message: 'Scheduled date must be in the future' })
  execute_at: Date;

  /**
   * ID of the user creating this event.
   * @example 1
   */
  @ApiProperty({ example: '134195f8-8971-4eb8-bc2b-737f90326463' })
  @IsString()
  user_id: string;
}
