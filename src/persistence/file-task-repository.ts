import type { Task } from "../domain/task.js";
import { readJsonFile, writeJsonFile } from "../infrastructure/json-store.js";
import type { TaskRepository } from "./task-repository.js";

interface TaskStore {
  schemaVersion: number;
  tasks: Task[];
}

const CURRENT_SCHEMA_VERSION = 1;

export class FileTaskRepository implements TaskRepository {
  constructor(private readonly filePath: string) {}

  async list(): Promise<Task[]> {
    const store = await this.loadStore();
    return store.tasks;
  }

  async save(task: Task): Promise<void> {
    const store = await this.loadStore();
    const nextTasks = store.tasks.some((item) => item.id === task.id)
      ? store.tasks.map((item) => (item.id === task.id ? task : item))
      : [...store.tasks, task];

    await this.saveStore({ ...store, tasks: nextTasks });
  }

  async deleteById(id: string): Promise<boolean> {
    const store = await this.loadStore();
    const nextTasks = store.tasks.filter((task) => task.id !== id);
    const deleted = nextTasks.length !== store.tasks.length;
    if (deleted) {
      await this.saveStore({ ...store, tasks: nextTasks });
    }
    return deleted;
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = await this.list();
    return tasks.find((task) => task.id === id) ?? null;
  }

  private async loadStore(): Promise<TaskStore> {
    const fallback: TaskStore = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      tasks: []
    };
    const data = await readJsonFile<TaskStore>(this.filePath, fallback);

    if (data.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      throw new Error(
        `Unsupported schemaVersion ${String(data.schemaVersion)}; expected ${String(
          CURRENT_SCHEMA_VERSION
        )}.`
      );
    }

    return {
      schemaVersion: data.schemaVersion,
      tasks: Array.isArray(data.tasks) ? data.tasks : []
    };
  }

  private async saveStore(store: TaskStore): Promise<void> {
    await writeJsonFile(this.filePath, store);
  }
}
