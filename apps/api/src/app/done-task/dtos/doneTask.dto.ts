
export class DoneTaskDto {
  readonly progressTaskId: number;
}

export class GetAllDoneTaskDto {
  readonly projectId: number;
}

export class DeleteDoneTaskDto {
  readonly taskId: number;
}
