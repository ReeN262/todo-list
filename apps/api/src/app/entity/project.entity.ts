import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity as User} from "./user.entity";
import {InProgressEntity as InProgressTask} from "./in-progress.entity";
import {DoneTaskEntity as DoneTask} from "./doneTask.entity";


@Entity('Project')
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.projects, {onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  @OneToMany(() => InProgressTask, progressTask => progressTask.project, {cascade: true})
  @JoinColumn()
  inProgressTasks: InProgressTask[];

  @OneToMany(() => DoneTask, doneTask => doneTask.project, {cascade: true})
  @JoinColumn()
  doneTasks: DoneTask[];
}
