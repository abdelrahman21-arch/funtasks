import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { jwtConstants } from '../shared/configs/jwt.config';
import { EventResponseDto } from '../events/dtos/events-response.dto';
import { EventEntity } from '../events/entities/events.entities';
import { plainToInstance } from 'class-transformer';

/**
 * Service handling user registration and authentication logic.
 */
@Injectable()
export class UsersService {
      constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
    @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
    private jwtService: JwtService,
  ) {
  }

  /**
   * Registers a new user.
   * @param createUserDto - DTO containing email and password.
   * @returns A success message or throws conflict if email already exists.
   */
   async register(createUserDto: CreateUserDto) {
      const existing = await this.usersRepo.findOne({ where: { email: createUserDto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepo.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    await this.usersRepo.save(newUser);

    return { message: 'User registered successfully' };
    
   }
 
   /**
   * Logs in a user by verifying credentials and generating JWT token.
   * @param loginDto - DTO containing login credentials.
   * @returns Access token on success.
   */
     async login(loginDto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: loginDto.email } });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const access_token = this.jwtService.sign(payload, {secret: jwtConstants.secret , expiresIn: jwtConstants.expiresIn });

    return { token: access_token,
      user_id: user._id,
     };
  }

    /**
   * Returns all events associated with a given user ID.
   * @param userId - ID of the user whose events to fetch.
   * @returns Array of events.
   */
  async getEventsByUser(userId: string): Promise<EventResponseDto[]> {
    const user = await this.usersRepo.findOne({ where: { _id: userId } });
    if(!user){
      throw new NotFoundException('User not found');
    }

    const userEvents = await this.eventRepo.find({
      where: { user: { _id: userId },  },
      relations: ['user'],
    });
    if( !userEvents || userEvents.length === 0){
      throw new NotFoundException('No events found for this user');
    }
    return plainToInstance(EventResponseDto, userEvents, {
      excludeExtraneousValues: true,    
  });
}
  
}
