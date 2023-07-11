import { Entity, Column } from 'typeorm';

import { MongoBase } from './base';

@Entity({ name: 'user' })
export class User extends MongoBase {
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
