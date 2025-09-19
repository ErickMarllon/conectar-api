import { AddressDto } from '@/infrastructure/http/dtos/address/address-response.dto';
import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CurrentUserDto } from './current.user.dto';
import { SocialProvidersDto } from './social-providers.dto';

export class LoadAllUserOutputDto extends OmitType(CurrentUserDto, [
  'access_token',
  'refresh_token',
] as const) {
  @Expose()
  @ApiPropertyOptional()
  @Type(() => AddressDto)
  addresses?: AddressDto[];

  @Expose()
  @ApiPropertyOptional()
  is_active?: boolean;

  @Expose()
  @ApiPropertyOptional({ type: () => SocialProvidersDto })
  @Type(() => SocialProvidersDto)
  social_links: SocialProvidersDto;
}
