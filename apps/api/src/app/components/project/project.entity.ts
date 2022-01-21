import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {TaskEntity} from "../task/task.entity";
import {UserEntity as User} from "../user/user.entity";


@Entity('Project')
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.projects, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  @OneToMany(() => TaskEntity, task => task.project, {cascade: true})
  @JoinColumn()
  task: TaskEntity[];
}
