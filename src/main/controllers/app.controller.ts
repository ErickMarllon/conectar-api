import { ApiPublic } from '@/infrastructure/http/decorators/api-response-type.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
@Controller()
export class AppController {
  @ApiPublic()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
