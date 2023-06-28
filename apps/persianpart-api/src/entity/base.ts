import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base {
  @Column({ type: 'boolean', default: true })
    active: boolean;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    UpdatedAt: Date;
}
