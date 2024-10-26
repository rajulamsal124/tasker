import express, { Request, Response } from "express";
import { TaskManager } from "./core/TaskManager";

const app = express();
const port = 3000;

// Initialize the TaskManager singleton
const taskManager = TaskManager.getInstance();

// Express middleware to parse JSON request bodies
app.use(express.json());

// Set up CLI command handling
const args = process.argv.slice(2);
const command = args[0];
const description = args.slice(1).join(" ");

switch (command) {
  case "add":
    handleAddTask(description);
    break;
  case "list":
    handleListTasks();
    break;
  case "clear":
    handleClearTasks();
    break;
  default:
    console.log("Unknown command. Available commands are: add, list, clear.");
    break;
}

// Express route to add a task
app.post("/task", (req: Request, res: Response) => {
  const description = req.body.description;
  if (description) {
    const task = taskManager.addTask(description);
    res.status(201).json({ message: "Task added successfully", task });
  } else {
    res.status(400).json({ message: "Description is required" });
  }
});

// Express route to list all tasks
app.get("/tasks", (req: Request, res: Response) => {
  const tasks = taskManager.getTasks();
  res.json(tasks);
});

// Express route to clear all tasks
app.delete("/tasks", (req: Request, res: Response) => {
  taskManager.clearTasks();
  res.json({ message: "All tasks cleared" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// CLI command functions
function handleAddTask(description: string) {
  if (description) {
    const task = taskManager.addTask(description);
    console.log("Task added successfully:", task);
  } else {
    console.log("Please provide a description for the task.");
  }
}

function handleListTasks() {
  const tasks = taskManager.getTasks();
  if (tasks.length > 0) {
    console.log("Tasks:");
    tasks.forEach((task) => console.log(task));
  } else {
    console.log("No tasks available.");
  }
}

function handleClearTasks() {
  taskManager.clearTasks();
  console.log("All tasks cleared.");
}
