import { IsString } from 'class-validator';

export class RefreshReqDto {
  @IsString()
  refreshToken!: string;
}
