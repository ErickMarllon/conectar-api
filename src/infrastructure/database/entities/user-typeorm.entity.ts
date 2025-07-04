import { UserRole } from '@/shared/enums/app.enum';
import { hashPassword as hashPass } from '@/shared/utils/password.util';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Session } from './session-typeorm.entity';

@Entity('user')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  first_name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  country_code: string;

  @Column({ nullable: true })
  area_code: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  last_login_at: Date;

  @Column({
    name: 'is_blocked',
    default: false,
  })
  is_blocked: boolean;

  @OneToOne(() => Session, (session) => session.user)
  session: Session;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }
}
