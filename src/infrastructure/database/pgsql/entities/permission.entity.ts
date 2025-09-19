// permission.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permission')
export class PgsqlPermissionM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //   @OneToMany(() => PgsqlRolePermission, (rp) => rp.permission)
  //   rolePermissions: PgsqlRolePermission[];

  //   @OneToMany(() => UserPermission, (up) => up.permission)
  //   userPermissions: UserPermission[];
}
