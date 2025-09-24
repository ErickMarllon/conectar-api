export const allowedFieldsForTenantClassification = [
  { alias: 'tenant', field: 'id', isUuid: true },
  { alias: 'tenant', field: 'name' },
  { alias: 'tenant', field: 'slug' },
  { alias: 'tenant', field: 'email' },
  { alias: 'tenant', field: 'phone_number' },
  { alias: 'tenant', field: 'whatsapp' },
  { alias: 'tenant', field: 'is_public' },
  { alias: 'tenant', field: 'created_at' },
  { alias: 'tenant', field: 'updated_at' },

  { alias: 'address', field: 'city' },
  { alias: 'address', field: 'country' },
  { alias: 'address', field: 'is_default' },
  { alias: 'address', field: 'neighborhood' },
  { alias: 'address', field: 'state' },
  { alias: 'address', field: 'street' },
  { alias: 'address', field: 'zip_code' },
];
