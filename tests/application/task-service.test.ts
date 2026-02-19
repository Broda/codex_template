import { describe, expect, it } from "vitest";
import { TaskService } from "../../src/application/task-service.js";
import type { Task } from "../../src/domain/task.js";
import type { TaskRepository } from "../../src/persistence/task-repository.js";

class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks = new Map<string, Task>();

  async list(): Promise<Task[]> {
    return [...this.tasks.values()];
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null;
  }
}

describe("TaskService", () => {
  it("creates and lists tasks", async () => {
    const service = new TaskService(new InMemoryTaskRepository());

    const created = await service.create({ title: "  Start project  " });
    const listed = await service.list();

    expect(created.title).toBe("Start project");
    expect(created.status).toBe("todo");
    expect(listed).toHaveLength(1);
  });

  it("updates and deletes tasks", async () => {
    const service = new TaskService(new InMemoryTaskRepository());

    const created = await service.create({ title: "Initial" });
    const updated = await service.update(created.id, {
      status: "in_progress",
      description: "Working"
    });
    const deleted = await service.delete(created.id);

    expect(updated.status).toBe("in_progress");
    expect(updated.description).toBe("Working");
    expect(deleted).toBe(true);
  });

  it("fails updates for missing tasks", async () => {
    const service = new TaskService(new InMemoryTaskRepository());

    await expect(service.update("missing", { title: "Nope" })).rejects.toThrow(
      "Task not found."
    );
  });
});
