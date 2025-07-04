import { UserRole } from '@/shared/enums/app.enum';

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  picture?: string | null;
  country_code?: string | null;
  area_code?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  cpf?: string | null;
  role: UserRole;
  is_blocked: boolean;
  last_login_at: Date;
  created_at: Date;
  updated_at: Date;
}
