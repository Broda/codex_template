import { resolve } from "node:path";
import { TaskService } from "../application/task-service.js";
import { FileTaskRepository } from "../persistence/file-task-repository.js";

type CliCommand = "add" | "list" | "update" | "delete";

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  const dbPath = resolve(process.cwd(), "data", "tasks.json");
  const repository = new FileTaskRepository(dbPath);
  const service = new TaskService(repository);

  switch (command as CliCommand) {
    case "add": {
      const [title, description] = args;
      if (!title) {
        throw new Error('Usage: add "title" ["description"]');
      }
      const task = await service.create({ title, description });
      console.log(`Created task ${task.id}`);
      break;
    }
    case "list": {
      const tasks = await service.list();
      if (tasks.length === 0) {
        console.log("No tasks found.");
        break;
      }
      for (const task of tasks) {
        console.log(`${task.id} | ${task.status} | ${task.title}`);
      }
      break;
    }
    case "update": {
      const [id, field, value] = args;
      if (!id || !field || value === undefined) {
        throw new Error('Usage: update "id" "title|description|status" "value"');
      }
      if (!["title", "description", "status"].includes(field)) {
        throw new Error('Field must be one of: "title", "description", "status".');
      }

      const task = await service.update(id, { [field]: value });
      console.log(`Updated task ${task.id}`);
      break;
    }
    case "delete": {
      const [id] = args;
      if (!id) {
        throw new Error('Usage: delete "id"');
      }
      const deleted = await service.delete(id);
      console.log(deleted ? `Deleted task ${id}` : `Task ${id} not found.`);
      break;
    }
    default:
      console.log(`Task Tracker CLI\n\nCommands:\n  add \"title\" [\"description\"]\n  list\n  update \"id\" \"title|description|status\" \"value\"\n  delete \"id\"`);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exitCode = 1;
});
