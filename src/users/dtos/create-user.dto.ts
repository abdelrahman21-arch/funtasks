import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO for creating a new user during registration.
 */
export class CreateUserDto {
    /**
   * User email address.
   * @example "user@example.com"
   */
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
    /**
   * User password (minimum 6 characters).
   * @example "password123"
   */
  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
  
}
