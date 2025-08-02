import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventResponseDto } from 'src/events/dtos/events-response.dto';

/**
 * Controller responsible for user registration and login routes.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) {}
 /**
   * Register a new user.
   * @param createUserDto - DTO containing email and password.
   * @returns Success message on registration.
   */
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

   /**
   * Login a user and return a JWT token.
   * @param loginDto - DTO containing credentials.
   * @returns JWT access token on successful login.
   */
  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT token' })
  @ApiResponse({ status: 200, description: 'Returns JWT token' })
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

    /**
   * Returns all events associated with a given user.
   * @param userId - ID of the user.
   * @returns Array of events.
   */
  @Get(':userId/events')
  @ApiOperation({ summary: 'Get all events for a user by user ID' })
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ description: 'List of user events', type: [Event] })
  getByUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<EventResponseDto[]> {
    return this.usersService.getEventsByUser(userId);
  }
}
