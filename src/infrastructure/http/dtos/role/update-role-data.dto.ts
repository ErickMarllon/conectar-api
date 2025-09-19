import { PartialType } from '@nestjs/swagger';
import { RoleResponseDto } from './role-response.dto';

export class UpdateRoleDto extends PartialType(RoleResponseDto) {}
