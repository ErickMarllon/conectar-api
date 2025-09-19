// user-permission.entity.ts
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_permission')
export class PgsqlUserPermissionM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @ManyToOne(() => PgsqlUser, (user) => user.userPermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   user: PgsqlUser;

  //   @ManyToOne(() => Permission, (permission) => permission.userPermissions, {
  //     onDelete: 'CASCADE',
  //   })
  //   permission: Permission;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
