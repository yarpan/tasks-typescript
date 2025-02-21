interface ITaskManager {
  createTask(title: string, content: string, type?: TaskType): ITask;
  updateTask(id: Uuid, title?: string, content?: string, force?: ForceFlag): boolean;
  removeTask(id: Uuid, force?: ForceFlag): boolean;
  completeTask(id: Uuid): boolean;
}

class TaskManager implements ITaskManager {
  private tasks: Map<Uuid, ITask>;

  constructor() {
    this.tasks = new Map();
  }

  private generateUuid(): Uuid {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid as Uuid;
  }

  createTask(title: string, content: string, type: TaskType = "default"): ITask {
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
    return newTask;
  }

  updateTask(id: Uuid, title?: string, content?: string, force?: ForceFlag): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    if (task.type === "protected" && force !== 'force') return false;
    task.title = title ?? task.title;
    task.content = content ?? task.content;
    task.updatedAt = new Date();
    return true;
  }

  removeTask(id: Uuid, force?: ForceFlag): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    if (task.type === "protected" && force !== 'force') return false;
    return this.tasks.delete(id);
  }

  completeTask(id: Uuid): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    task.completed = true;
    task.updatedAt = new Date();
    return true;
  }
}

class TodoList implements ITodoList {
  private storage: ITaskStorage;
  private taskManager: ITaskManager;

  constructor(storage: ITaskStorage, taskManager: ITaskManager) {
    this.storage = storage;
    this.taskManager = taskManager;
  }

  addTask(title: string, content: string, type?: TaskType): ITask | undefined {
    const task = this.taskManager.createTask(title, content, type);
    this.storage.saveTasks(this.getAllTasks().concat(task));
    return task;
  }

  deleteTask(id: Uuid, force?: ForceFlag): boolean {
    const result = this.taskManager.removeTask(id, force);
    if (result) this.storage.saveTasks(this.getAllTasks());
    return result;
  }

  editTask(id: Uuid, title?: string, content?: string, force?: ForceFlag): boolean {
    const result = this.taskManager.updateTask(id, title, content, force);
    if (result) this.storage.saveTasks(this.getAllTasks());
    return result;
  }

  markCompleted(id: Uuid): boolean {
    const result = this.taskManager.completeTask(id);
    if (result) this.storage.saveTasks(this.getAllTasks());
    return result;
  }

  getTask(id: Uuid): ITask | undefined {
    return this.getAllTasks().find(task => task.id === id);
  }

  getAllTasks(): ITask[] {
    return this.storage.loadTasks();
  }

  getTaskCounts(): { total: number; remaining: number } {
    const allTasks = this.getAllTasks();
    const remaining = allTasks.filter(task => !task.completed).length;
    return { total: allTasks.length, remaining };
  }

  searchTasks(query: string): ITask[] {
    return this.getAllTasks().filter(task => task.title.includes(query) || task.content.includes(query));
  }

  sortTasks(by: "status" | "date"): ITask[] {
    return this.getAllTasks().sort((a, b) => by === "status"
      ? Number(a.completed) - Number(b.completed)
      : b.createdAt.getTime() - a.createdAt.getTime());
  }
}
