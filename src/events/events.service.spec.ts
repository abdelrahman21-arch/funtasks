import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/events.entities';
import { UserEntity } from '../users/entities/user.entity/user.entity';

describe('EventsService', () => {
  let service: EventsService;
  let eventRepoMock: Partial<Repository<EventEntity>>;
  let userRepoMock: Partial<Repository<UserEntity>>;

  beforeEach(async () => {
    eventRepoMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    userRepoMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getRepositoryToken(EventEntity), useValue: eventRepoMock },
        { provide: getRepositoryToken(UserEntity), useValue: userRepoMock },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should create an event for a user', async () => {
    const user = { id: 1, _id: 'uuid-user' } as UserEntity;
    const dto = {
      user_id: 'uuid-user',
      event_name: 'Test Event',
      execute_at: new Date(),
    };

    (userRepoMock.findOne as jest.Mock).mockResolvedValue(user);
    (eventRepoMock.create as jest.Mock).mockReturnValue(dto);
    (eventRepoMock.save as jest.Mock).mockResolvedValue(dto);

    const result = await service.createEvent(dto);
    expect(result.event_name).toBe(dto.event_name);
    expect(eventRepoMock.save).toHaveBeenCalled();
  });
});
