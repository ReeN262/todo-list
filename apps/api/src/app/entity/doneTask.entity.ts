import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ProjectEntity as Project} from "./project.entity";

@Entity('DoneTask')
export class DoneTaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @ManyToOne(() => Project, project => project.doneTasks, {onDelete: 'CASCADE'})
  @JoinColumn()
  project: Project;
}
