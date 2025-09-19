export const aliasUserMap: Record<
  string,
  'user' | 'role' | 'address' | 'tenant'
> = {
  searchTerm: 'user',
  id: 'user',
  first_name: 'user',
  last_name: 'user',
  email: 'user',
  cpf_cnpj: 'user',
  phone_number: 'user',
  is_blocked: 'user',

  role: 'role',

  zip_code: 'address',
  street: 'address',
  city: 'address',
  state: 'address',
  country: 'address',
  neighborhood: 'address',
  is_default: 'address',

  tenant: 'tenant',
};
