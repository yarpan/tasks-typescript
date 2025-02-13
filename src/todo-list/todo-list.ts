import { writeFileSync, readFileSync } from 'fs';

type TaskType = 'default' | 'protected';
type ForceFlag = 'force' | undefined;
type Uuid = string & { __uuid: 'uuid' };

interface ITask {
  id: Uuid;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  type: TaskType;
}

interface ITodoList {
  addTask(title: string, content: string, type?: TaskType): ITask | undefined;
  deleteTask(id: Uuid, force?: ForceFlag): boolean;
  editTask(id: Uuid, title?: string, content?: string, force?: ForceFlag): boolean;
  markCompleted(id: Uuid): boolean;
  getTask(id: Uuid): ITask | undefined;
  getAllTasks(): ITask[];
  getTaskCounts(): { total: number; remaining: number };
  searchTasks(query: string): ITask[];
  sortTasks(by: "status" | "date"): ITask[];
}

export interface ITaskStorage {
  loadTasks(): ITask[];
  saveTasks(tasks: ITask[]): boolean;
}

export abstract class TaskStorage {
  abstract loadTasks(): ITask[];
  abstract saveTasks(tasks: ITask[]): boolean;
}

export class FileStorage extends TaskStorage {
  private filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  loadTasks(): ITask[] {
    try {
      const data = readFileSync(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  }

  saveTasks(tasks: ITask[]): boolean {
    try {
      writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
      return true;
    } catch (error) {
      console.error("Error saving tasks:", error);
      return false;
    }
  }
}


export class TodoList implements ITodoList {
  private tasks: Map<Uuid, ITask> = new Map();
  private storage: ITaskStorage;

  constructor(storage: ITaskStorage) {
    this.storage = storage;
    this.loadTasks();
  }

  private generateUuid(): Uuid {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid as Uuid;
  }

  private loadTasks(): boolean {
    try {
      const tasks = this.storage.loadTasks();
      tasks.forEach(task => this.tasks.set(task.id, task));
      return true;
    } catch (error) {
      console.log("Error loading tasks:", error);
      return false;
    }
  }

  private saveTasks(): boolean {
    try {
      return this.storage.saveTasks(Array.from(this.tasks.values()));
    } catch (error) {
      console.log("Error saving tasks:", error);
      return false;
    }
  }

  addTask(title: string, content: string, type: TaskType = "default"): ITask | undefined {
    if (!title.trim() || !content.trim()) {
      console.log("Title and content cannot be empty");
      return undefined;
    }
    const newTask: ITask = {
      id: this.generateUuid(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      type,
    };
    this.tasks.set(newTask.id, newTask);
    const isTaskSaved: boolean = this.saveTasks();
    if (isTaskSaved)
      return newTask;
  }

  deleteTask(id: Uuid, force?: ForceFlag): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    if (task.type === "protected" && force !== 'force') {
      console.log("Cannot delete protected task without force flag.");
      return false;
    }
    this.tasks.delete(id);
    const isTaskSaved: boolean = this.saveTasks();
    return isTaskSaved;
  }

  editTask(id: Uuid, title?: string, content?: string, force?: ForceFlag): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;

    if (task.type === "protected" && force !== 'force') {
      console.log("Cannot edit protected task without force flag.");
      return false;
    }

    task.title = title !== undefined ? title : task.title;
    task.content = content !== undefined ? content : task.content;
    task.updatedAt = new Date();
    const isTaskSaved: boolean = this.saveTasks();
    return isTaskSaved;
  }

  markCompleted(id: Uuid): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    task.completed = true;
    task.updatedAt = new Date();
    const isTaskSaved: boolean = this.saveTasks();
    return isTaskSaved;
  }

  getTask(id: Uuid): ITask | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): ITask[] {
    return Array.from(this.tasks.values());
  }

  getTaskCounts(): { total: number; remaining: number } {
    const remaining = Array.from(this.tasks.values()).filter(task => !task.completed).length;
    return {
      total: this.tasks.size,
      remaining,
    };
  }

  searchTasks(query: string): ITask[] {
    return Array.from(this.tasks.values()).filter(task =>
      task.title.includes(query) || task.content.includes(query)
    );
  }

  sortTasks(by: "status" | "date"): ITask[] {
    const tasksArray = Array.from(this.tasks.values());
    if (by === "status") {
      return tasksArray.sort((a, b) => Number(a.completed) - Number(b.completed));
    }
    return tasksArray.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
