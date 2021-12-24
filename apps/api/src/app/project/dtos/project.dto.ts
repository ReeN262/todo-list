import {UserDto} from "../../user/dtos/user.dto";

export class ProjectDto {
  readonly id: number;
  readonly name: string;
}

export class NewProjectDto {
  readonly id: number;
  readonly name: string;
  readonly user: UserDto;
}

export class ProjectDeleteDto {
  readonly id: number;
}

