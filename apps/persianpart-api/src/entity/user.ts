import { Entity, ObjectIdColumn, Column } from 'typeorm';

import { Base } from './base';

import type { ObjectId } from 'typeorm';

@Entity({ name: 'user' })
export class User extends Base {
  @ObjectIdColumn()
    id: ObjectId;

  @Column({ type: 'string', nullable: true })
    firstName: string;

  @Column({ type: 'string', nullable: true })
    lastName: string;

  @Column({ type: 'string' })
    phoneNumber: string;

  @Column({ type: 'string' })
    password: string;

  @Column({ type: 'string', default: 'user' })
    permission: 'root' | 'user';

  get blocked(): boolean {
    return !this.active;
  }
  set blocked(cond: boolean) {
    this.active = !cond;
  }
}
