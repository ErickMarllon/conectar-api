export class UserPermission {
  id: string;

  //   @ManyToOne(() => PgsqlUser, (user) => user.userPermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   user: PgsqlUser;

  //   @ManyToOne(() => Permission, (permission) => permission.userPermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   permission: Permission;

  created_at: Date;
  updated_at: Date;

  constructor(input: UserPermission) {
    Object.assign(this, input);
  }
}
