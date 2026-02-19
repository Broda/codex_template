import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function readJsonFile<T>(path: string, fallback: T): Promise<T> {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    const maybe = error as NodeJS.ErrnoException;
    if (maybe.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

export async function writeJsonFile(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  await writeFile(tempPath, JSON.stringify(value, null, 2), "utf-8");
  await rename(tempPath, path);
}
