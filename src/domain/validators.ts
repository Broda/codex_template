import { TASK_STATUSES, type TaskStatus } from "./task.js";

export function validateTitle(title: string): string {
  const normalized = title.trim();
  if (!normalized) {
    throw new Error("Title is required.");
  }
  if (normalized.length > 120) {
    throw new Error("Title must be 120 characters or fewer.");
  }
  return normalized;
}

export function validateDescription(description?: string): string {
  const normalized = (description ?? "").trim();
  if (normalized.length > 500) {
    throw new Error("Description must be 500 characters or fewer.");
  }
  return normalized;
}

export function validateStatus(status: string): TaskStatus {
  if (!TASK_STATUSES.includes(status as TaskStatus)) {
    throw new Error(`Status must be one of: ${TASK_STATUSES.join(", ")}.`);
  }
  return status as TaskStatus;
}
