export class PgsqlRolePermission {
  role_id: string;
  permission_id: string;

  //   @ManyToOne(() => PgsqlRole, (role) => role.rolePermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   role: PgsqlRole;

  //   @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   permission: Permission;

  constructor(input: PgsqlRolePermission) {
    Object.assign(this, input);
  }
}
