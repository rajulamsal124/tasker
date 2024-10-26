import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Define the path for the tasks.json file
const TASK_FILE = path.join(__dirname, "..", "..", "tasks.json");

export interface Task {
  id: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

export class TaskManager {
  private static instance: TaskManager;
  private tasks: Task[] = [];

  // Private constructor to enforce singleton pattern
  private constructor() {
    this.loadTasks();
  }

  // Method to get the singleton instance of TaskManager
  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  // Load tasks from the JSON file, handling cases where the file may be empty or corrupted
  private loadTasks(): void {
    if (fs.existsSync(TASK_FILE)) {
      try {
        const data = fs.readFileSync(TASK_FILE, "utf-8");
        console.log("Loaded tasks data:", data); // Debug log
        this.tasks = data ? JSON.parse(data) : []; // Handle empty file
      } catch (error) {
        console.error("Error reading or parsing tasks.json:", error);
        this.tasks = []; // Fallback to an empty task list if JSON is invalid
      }
    } else {
      // If the file doesn't exist, initialize it with an empty array
      console.log("tasks.json not found. Creating a new file.");
      fs.writeFileSync(TASK_FILE, JSON.stringify([]));
      this.tasks = [];
    }
  }

  // Save tasks to the JSON file with proper error handling
  private saveTasks(): void {
    try {
      console.log("Saving tasks to file:", this.tasks); // Debug log
      fs.writeFileSync(TASK_FILE, JSON.stringify(this.tasks, null, 2));
      console.log("Tasks successfully saved to tasks.json");
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }

  // Add a new task and save it to the file
  public addTask(description: string): Task {
    const newTask: Task = {
      id: uuidv4(),
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    this.saveTasks(); // Save to file after adding the task
    return newTask;
  }

  // Retrieve all tasks
  public getTasks(): Task[] {
    return this.tasks;
  }

  // Clear all tasks from the list and save an empty array to the file
  public clearTasks(): void {
    console.log("Clearing all tasks..."); // Debug log
    this.tasks = [];
    this.saveTasks();
    console.log("All tasks cleared.");
  }
}
