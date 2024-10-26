import { TaskManager } from "../core/TaskManager";

describe("TaskManager", () => {
  let taskManager: TaskManager;

  beforeEach(() => {
    taskManager = TaskManager.getInstance();
    taskManager.clearTasks(); // Clear tasks for isolated tests
  });

  it("should add a task with the correct description and default status", () => {
    const task = taskManager.addTask("Test Task");

    expect(task.description).toBe("Test Task");
    expect(task.status).toBe("todo");
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();
  });

  it("should save the task to the list of tasks", () => {
    const initialTaskCount = taskManager.getTasks().length;
    taskManager.addTask("New Task");
    expect(taskManager.getTasks().length).toBe(initialTaskCount + 1);
  });
});
