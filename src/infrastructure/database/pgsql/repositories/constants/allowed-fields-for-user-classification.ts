export const allowedFieldsForUserClassification = [
  { alias: 'user', field: 'id', isUuid: true, operator: 'eq' },
  { alias: 'user', field: 'first_name', operator: 'ilike' },
  { alias: 'user', field: 'last_name', operator: 'ilike' },
  { alias: 'user', field: 'email', operator: 'ilike' },
  { alias: 'user', field: 'cpf', operator: 'ilike' },
  { alias: 'user', field: 'is_verified', operator: 'eq' },
  { alias: 'user', field: 'status', operator: 'eq' },
  { alias: 'user', field: 'phone_number', operator: 'ilike' },
  { alias: 'user', field: 'whatsapp', operator: 'ilike' },
  { alias: 'user', field: 'created_at', operator: 'eq' },
  { alias: 'user', field: 'updated_at', operator: 'eq' },
  { alias: 'user', field: 'last_login_at', operator: 'eq' },

  { alias: 'role', field: 'name', operator: 'ilike' },

  { alias: 'address', field: 'city', operator: 'ilike' },
  { alias: 'address', field: 'country', operator: 'ilike' },
  { alias: 'address', field: 'is_default', operator: 'eq' },
  { alias: 'address', field: 'neighborhood', operator: 'ilike' },
  { alias: 'address', field: 'state', operator: 'ilike' },
  { alias: 'address', field: 'street', operator: 'ilike' },
  { alias: 'address', field: 'zip_code', operator: 'eq' },
];
