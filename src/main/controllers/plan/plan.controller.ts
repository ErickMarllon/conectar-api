import {
  CreateGetPlanUseCase,
  CreateListPlanUseCase,
  CreateNewPlanUseCase,
  CreatePatchPlanUseCase,
  DeletePlanUseCase,
} from '@/domain/usecase/pgsql/plan';
import {
  ApiAuth,
  ApiPublic,
  paginateHeaders,
} from '@/infrastructure/http/decorators';
import {
  CreateNewPlanUseCaseModule,
  DeletePlanUseCaseModule,
  GetPlanUseCaseModule,
  ListPlanUseCaseModule,
  PatchPlanUseCaseModule,
} from '@/main/factories/usecases/plan';
import { Role } from '@/shared/enums';
import { PaginateOptions } from '@/shared/paginate/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ListPlanInputDto,
  ListPlanOutputDto,
  PlanCreateInputDto,
  PlanDto,
  PlanPatchInputDto,
} from './dto';

@ApiTags('plan')
@ApiBearerAuth()
@ApiExtraModels()
@Controller('plan')
export class PlanController {
  constructor(
    @Inject(CreateNewPlanUseCaseModule.CREATE_PLAN_USECASE)
    private readonly createPlan: CreateNewPlanUseCase,
    @Inject(GetPlanUseCaseModule.GET_PLAN_USECASE)
    private readonly getPlan: CreateGetPlanUseCase,
    @Inject(ListPlanUseCaseModule.LIST_PLAN_USECASE)
    private readonly listPlan: CreateListPlanUseCase,
    @Inject(PatchPlanUseCaseModule.PATCH_PLAN_USECASE)
    private readonly patchPlan: CreatePatchPlanUseCase,
    @Inject(DeletePlanUseCaseModule.DELETE_PLAN_USECASE)
    private readonly deletePlan: DeletePlanUseCase,
  ) {}

  @Get('/list')
  @ApiPublic({
    type: ListPlanOutputDto,
    description: 'Plans loaded successfully',
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  async list(
    @Query() query: ListPlanInputDto,
    @paginateHeaders() meta: PaginateOptions,
  ) {
    const { searchTerm, ...filters } = query;
    return await this.listPlan({
      filters,
      searchTerm,
      meta,
    });
  }

  @Post()
  @ApiAuth({
    type: PlanDto,
    description: 'Plan profile loaded successfully',
    statusCode: HttpStatus.OK,
    roles: [Role.OWNER, Role.DEV],
  })
  async create(@Body() body: PlanCreateInputDto) {
    return await this.createPlan(body);
  }

  @Get('/:id')
  @ApiPublic({
    type: PlanDto,
    description: 'Plan loaded successfully',
    statusCode: HttpStatus.OK,
  })
  async auth(@Param('id') id: string) {
    return await this.getPlan({ id });
  }

  @Patch('/:id')
  @ApiAuth({
    description: 'Plan updated successfully',
    statusCode: HttpStatus.OK,
    roles: [Role.OWNER, Role.DEV],
  })
  async update(@Param('id') id: string, @Body() data: PlanPatchInputDto) {
    return await this.patchPlan({
      ...data,
      id,
    });
  }

  @Delete()
  @ApiAuth({
    description: 'Plan deleted successfully',
    statusCode: HttpStatus.NO_CONTENT,
  })
  async delete(@Query('id') id: string) {
    return await this.deletePlan(id);
  }
}
