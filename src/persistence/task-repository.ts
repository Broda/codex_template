import type { Task } from "../domain/task.js";

export interface TaskRepository {
  list(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<Task | null>;
}
