import {Project} from "../project/project.interface";
export interface Task {
  taskName: string;
  project: Project;
  isDone?: boolean;
}

