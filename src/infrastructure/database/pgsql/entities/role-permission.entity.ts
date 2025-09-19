import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_permission')
export class PgsqlRolePermissionM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  role_id: string;

  @PrimaryColumn('uuid')
  permission_id: string;

  //   @ManyToOne(() => PgsqlRole, (role) => role.rolePermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   role: PgsqlRole;

  //   @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   permission: Permission;
}
