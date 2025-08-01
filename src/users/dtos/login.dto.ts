import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/**
 * DTO for user login.
 */
export class LoginDto {
  /**
   * Registered email address of the user.
   * @example "user@example.com"
   */
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
  
   /**
   * User password.
   * @example "password123"
   */
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
