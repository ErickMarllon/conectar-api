export class PgsqlPermission {
  id: string;
  code: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  //   @OneToMany(() => PgsqlRolePermission, (rp) => rp.permission)
  //   rolePermissions: PgsqlRolePermission[];

  //   @OneToMany(() => UserPermission, (up) => up.permission)
  //   userPermissions: UserPermission[];

  constructor(input: PgsqlPermission) {
    Object.assign(this, input);
  }
}
