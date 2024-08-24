import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/rbac/enums/role.enum';
import { BaseEntity } from '@entities/baseEntity/common.entities';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: null
  })
  fullName: string

  @Column({
    default: null
  }) phone: string

  @Column({
    default: null
  })
  avatar: string

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.FREELANCER,
  })
  role: Role;
  // Hash password before inserting into the database
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
