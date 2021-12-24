import {NewProjectDto} from "../../project/dtos/project.dto";

export class InProgressDto {
  readonly taskName: string;
  readonly project: NewProjectDto;
}

export class GetAllInProgressDto {
  readonly projectId: number;
}

export class DeleteInProgressDto {
  readonly taskId: number;
}
