import { TaskManager } from "../core/TaskManager";
import { AddTaskCommand } from "../commands/AddTask";

describe("AddTaskCommand", () => {
  let taskManager: TaskManager;

  beforeEach(() => {
    taskManager = TaskManager.getInstance();
    taskManager.clearTasks(); // Clear tasks before each test
  });

  it("should execute and add a task to TaskManager", () => {
    const command = new AddTaskCommand(taskManager, "CLI Task");
    command.execute();

    const addedTask = taskManager
      .getTasks()
      .find((task) => task.description === "CLI Task");
    expect(addedTask).toBeDefined();
    expect(addedTask?.status).toBe("todo");
  });
});
