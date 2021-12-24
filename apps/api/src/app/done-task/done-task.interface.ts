import {Project} from "../project/project.interface";

export interface DoneTask {
  id?: number;
  taskName: string;
  project: Project;
  projectId?: number;
}
