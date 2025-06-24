import { AuthProvider } from '@/shared/enums/app.enum';

export class OAuthDTO {
  source_id: string;
  source: AuthProvider;
  access_token: string;
  refresh_token: string;
  expires: Date | null;
}
