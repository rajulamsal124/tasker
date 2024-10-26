import { TaskManager } from "../core/TaskManager";

export interface Command {
  execute(): void;
}

export class AddTaskCommand implements Command {
  constructor(private taskManager: TaskManager, private description: string) {}

  execute(): void {
    this.taskManager.addTask(this.description);
  }
}
