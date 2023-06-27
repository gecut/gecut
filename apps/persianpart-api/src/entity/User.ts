import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

import type { ObjectId } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
    id: ObjectId;

  @Column({ type: 'string', nullable: true })
    firstName: string;

  @Column({ type: 'string', nullable: true })
    lastName: string;

  @Column({ type: 'string', unique: true })
    phoneNumber: string;

  @Column({ type: 'string' })
    password: string;

  @Column({ type: 'string', default: 'user' })
    permission: 'root' | 'user';

  @Column({ type: 'boolean', default: true })
    active: boolean;

  get blocked(): boolean {
    return !this.active;
  }
  set blocked(cond: boolean) {
    this.active = !cond;
  }
  blockUser() {
    this.blocked = true;
  }
}
