import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import {ProjectEntity as Project} from "./project.entity";

@Entity('InProgress')
export class InProgressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @ManyToOne(() => Project, project => project.inProgressTasks, {onDelete: 'CASCADE'})
  @JoinColumn()
  project: Project;
}
