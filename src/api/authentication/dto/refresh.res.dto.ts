import { IsDate, IsString } from 'class-validator';

export class RefreshResDto {
  @IsString()
  accessToken!: string;

  @IsString()
  refreshToken!: string;

  @IsDate()
  tokenExpires!: Date;
}
