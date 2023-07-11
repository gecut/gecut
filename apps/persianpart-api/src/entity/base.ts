import { Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

import type { ObjectId} from 'typeorm';

export abstract class MongoBase {
  @ObjectIdColumn()
    id: ObjectId;

  @Column({ type: 'boolean', default: true })
    active: boolean;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
