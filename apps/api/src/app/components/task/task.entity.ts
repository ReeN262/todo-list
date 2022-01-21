import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {ProjectEntity as Project} from "../project/project.entity";

@Entity('task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  isDone: boolean;

  @ManyToOne(() => Project, project => project.task, {onDelete: 'CASCADE'})
  @JoinColumn()
  project: Project;
}
