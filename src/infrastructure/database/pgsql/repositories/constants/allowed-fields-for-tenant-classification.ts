export const allowedFieldsForTenantClassification = [
  { alias: 'tenant', field: 'id', isUuid: true, operator: 'eq' },
  { alias: 'tenant', field: 'name', operator: 'ilike' },
  { alias: 'tenant', field: 'slug', operator: 'ilike' },
  { alias: 'tenant', field: 'email', operator: 'ilike' },
  { alias: 'tenant', field: 'phone_number', operator: 'ilike' },
  { alias: 'tenant', field: 'whatsapp', operator: 'ilike' },
  { alias: 'tenant', field: 'is_public', operator: 'eq' },
  { alias: 'tenant', field: 'created_at', operator: 'eq' },
  { alias: 'tenant', field: 'updated_at', operator: 'eq' },

  { alias: 'address', field: 'city', operator: 'ilike' },
  { alias: 'address', field: 'country', operator: 'ilike' },
  { alias: 'address', field: 'is_default', operator: 'eq' },
  { alias: 'address', field: 'neighborhood', operator: 'ilike' },
  { alias: 'address', field: 'state', operator: 'ilike' },
  { alias: 'address', field: 'street', operator: 'ilike' },
  { alias: 'address', field: 'zip_code', operator: 'eq' },
];
