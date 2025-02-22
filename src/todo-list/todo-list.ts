import { writeFileSync, readFileSync } from 'fs';

type TaskType = 'default' | 'protected';
type ForceFlag = 'force' | undefined;
type Uuid = string & { __uuid: 'uuid' };

interface Task {
  id: Uuid;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  type: TaskType;
}

export class TodoList {
  private tasks: Map<Uuid, Task> = new Map();
  private filePath = 'todo-list-data.json';

  constructor() {
    this.loadTasks();
  }

  private generateUuid(): Uuid {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid as Uuid;
  }

  private loadTasks(): void {
    try {
      const data = readFileSync(this.filePath, 'utf-8');
      const tasks: Task[] = JSON.parse(data);
      tasks.forEach(task => {
        this.tasks.set(task.id, task);
      });
    } catch (error) {
      console.log("Can not read list of To Do's");
    }
  }

  private saveTasks(): boolean {
    try {
      const tasksArray = Array.from(this.tasks.values());
      writeFileSync(this.filePath, JSON.stringify(tasksArray, null, 2));
      return true;
    } catch (error) {
      console.error("Error saving tasks:", error);
      return false;
    }
  }

  addTask(title: string, content: string, type: TaskType = "default"): Task {
    if (!title.trim() || !content.trim()) {
      throw new Error("Title and content cannot be empty");
    }
    const newTask: Task = {
      id: this.generateUuid(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      type,
    };
    this.tasks.set(newTask.id, newTask);
    this.saveTasks();
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
    this.saveTasks();
    return true;
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
    this.saveTasks();
    return true;
  }

  markCompleted(id: Uuid): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    task.completed = true;
    task.updatedAt = new Date();
    this.saveTasks();
    return true;
  }

  getTask(id: Uuid): Task | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTaskCounts(): { total: number; remaining: number } {
    const remaining = Array.from(this.tasks.values()).filter(task => !task.completed).length;
    return {
      total: this.tasks.size,
      remaining,
    };
  }

  searchTasks(query: string): Task[] {
    return Array.from(this.tasks.values()).filter(task =>
      task.title.includes(query) || task.content.includes(query)
    );
  }

  sortTasks(by: "status" | "date"): Task[] {
    const tasksArray = Array.from(this.tasks.values());
    if (by === "status") {
      return tasksArray.sort((a, b) => Number(a.completed) - Number(b.completed));
    }
    return tasksArray.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
