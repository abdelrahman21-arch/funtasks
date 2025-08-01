import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
