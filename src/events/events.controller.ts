import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventResponseDto } from './dtos/events-response.dto';

/**
 * Controller to handle routes related to event scheduling and retrieval.
 */
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * Endpoint to create a new scheduled event.
   * @param createEventDto - Event data from the request body.
   * @returns The newly created event.
   */
  @Post('schedule')
  @ApiOperation({ summary: 'Create a new scheduled event for a user' })
  @ApiCreatedResponse({ description: 'Event created successfully', type: Event })
  @ApiNotFoundResponse({ description: 'User not found' })
  create(@Body() createEventDto: CreateEventDto): Promise<EventResponseDto> {
    return this.eventsService.createEvent(createEventDto);
  }

}
