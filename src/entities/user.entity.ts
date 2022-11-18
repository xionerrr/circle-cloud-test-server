import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { T_UserId } from 'src/models/user.model'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: T_UserId

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  hashedRt: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({
    default: true,
  })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
