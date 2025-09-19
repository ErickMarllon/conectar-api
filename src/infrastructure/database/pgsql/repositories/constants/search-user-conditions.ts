export const searchConditions = [
  `user.first_name ILIKE :search`,
  `user.last_name ILIKE :search`,
  `user.email ILIKE :search`,
  `user.phone_number ILIKE :search`,
  `user.cpf_cnpj ILIKE :search`,

  `role.name ILIKE :search`,

  `address.zip_code ILIKE :search`,
  `address.street ILIKE :search`,
  `address.city ILIKE :search`,
  `address.state ILIKE :search`,
  `address.country ILIKE :search`,
];
