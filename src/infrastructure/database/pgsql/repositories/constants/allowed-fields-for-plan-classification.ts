export const allowedFieldsForPlanClassification = [
  { alias: 'plan', field: 'id', isUuid: true, operator: 'eq' },
  { alias: 'plan', field: 'name', operator: 'ilike' },
  { alias: 'plan', field: 'tier', operator: 'ilike' },
  { alias: 'plan', field: 'interval', operator: 'eq' },
  { alias: 'plan', field: 'max_users', operator: 'eq' },
  { alias: 'plan', field: 'max_products', operator: 'eq' },
  { alias: 'plan', field: 'max_services', operator: 'eq' },
  { alias: 'plan', field: 'created_at', operator: 'eq' },
  { alias: 'plan', field: 'updated_at', operator: 'eq' },
];
