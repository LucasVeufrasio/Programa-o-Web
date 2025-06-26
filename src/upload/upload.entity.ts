import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column()
  email!: string;

  @Column()
  senha!: string;

  @CreateDateColumn()
  created_at!: Date;
}
