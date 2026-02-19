import { randomUUID } from "node:crypto";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../domain/task.js";
import {
  validateDescription,
  validateStatus,
  validateTitle
} from "../domain/validators.js";
import type { TaskRepository } from "../persistence/task-repository.js";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async create(input: CreateTaskInput): Promise<Task> {
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title: validateTitle(input.title),
      description: validateDescription(input.description),
      status: "todo",
      createdAt: now,
      updatedAt: now
    };

    await this.repository.save(task);
    return task;
  }

  async list(): Promise<Task[]> {
    return this.repository.list();
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Task not found.");
    }

    const updated: Task = {
      ...existing,
      title: input.title !== undefined ? validateTitle(input.title) : existing.title,
      description:
        input.description !== undefined
          ? validateDescription(input.description)
          : existing.description,
      status: input.status !== undefined ? validateStatus(input.status) : existing.status,
      updatedAt: new Date().toISOString()
    };

    await this.repository.save(updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.deleteById(id);
  }
}
