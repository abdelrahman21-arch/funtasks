import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { EventEntity } from '../events/entities/events.entities';

describe('UsersService', () => {
  let service: UsersService;
  let userRepoMock: any;
  let eventRepoMock: any;
  let jwtServiceMock: any;

  beforeEach(async () => {
    userRepoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    eventRepoMock = {
        find: jest.fn(),
    }

    jwtServiceMock = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useValue: userRepoMock },
        { provide: getRepositoryToken(EventEntity), useValue: eventRepoMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should register a new user successfully', async () => {
    const dto = { email: 'test@example.com', password: 'password123' };

    userRepoMock.findOne.mockResolvedValue(undefined);
    userRepoMock.create.mockReturnValue(dto);
    userRepoMock.save.mockResolvedValue(dto);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password' as never);

    const result = await service.register(dto);
    expect(result).toEqual({ message: 'User registered successfully' });
    expect(userRepoMock.save).toHaveBeenCalled();
  });

  it('should login and return access token', async () => {
    const user = { _id:'some-id', id: 1, email: 'test@example.com', password: 'hashed' };
    const dto = { email: 'test@example.com', password: 'raw' };

    userRepoMock.findOne.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    jwtServiceMock.sign.mockReturnValue('mocked_token');

    const result = await service.login(dto);
    expect(result).toEqual({ token: 'mocked_token', user_id: user._id });
  });

    it('should return events related to a user', async () => {
    const userId = 'uuid-user';
    const events = [{ name: 'A' }, { name: 'B' }];
    (eventRepoMock.find as jest.Mock).mockResolvedValue(events);
     (userRepoMock.findOne as jest.Mock).mockResolvedValue(userId);

    const result = await service.getEventsByUser(userId);
    expect(result.length).toBe(2);
  });
});
