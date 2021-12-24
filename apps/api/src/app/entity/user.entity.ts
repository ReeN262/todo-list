import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ProjectEntity as Project} from "./project.entity";


@Entity('Users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @OneToMany(() => Project, project => project.user, {cascade: true})
  @JoinColumn()
  projects: Project[];

}
